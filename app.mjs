import "https://cdnjs.cloudflare.com/ajax/libs/mithril/2.0.4/mithril.min.js";

const Data = {
  item: { interval: 5, max_interval: 30, attempts: 5, backoff: 2 },
  update: (field, value) => {
    Data.item[field] = value;
  },
};

const App = {
  view: () => [
    m("main", [
      m("h1", "Exponential Backoff Retry Policy Calculator"),
      m("hr"),
      m(Form),
      m("hr"),
      m(Plan),
    ]),
  ],
};

const Form = {
  view: () => [
    m("form", [
      m("fieldset", [
        TextField("Interval (sec)", "", "interval", Data.item.interval),
        TextField(
          "Max Interval (sec)",
          "",
          "max_interval",
          Data.item.max_interval
        ),
        TextField("Retry Attempts", "", "attempts", Data.item.attempts),
        TextField("Backoff Rate", "", "backoff", Data.item.backoff),
      ]),
    ]),
  ],
};

const TextField = (label, placeholder, field, value) =>
  m("div", [
    m("label", { for: field }, `${label}: `),
    m("input", {
      type: "text",
      id: field,
      name: field,
      placeholder: placeholder,
      value: value,
      oninput: (e) => Data.update(field, e.target.value),
    }),
    m("br"),
  ]);

const Plan = {
  view: () => {
    let interval = parseFloat(Data.item.interval);
    let max = parseFloat(Data.item.max_interval);
    let attempts = parseFloat(Data.item.attempts);
    let backoff = parseFloat(Data.item.backoff);
    let currentDate = new Date();

    let times = [];
    let t = 0;
    for (let i = 0; i < attempts; i++) {
      let toAdd = t * 1000;
      let timeOffset = new Date(currentDate.getTime() + toAdd);
      let timeStr =
        timeOffset.toLocaleTimeString() + ":" + timeOffset.getMilliseconds();
      let sub = interval * Math.pow(backoff, i);
      t += sub > max ? max : sub;
      times.push({ seconds: t, timestamp: timeStr });
    }
    return m("table", [
      m(
        "thead",
        m("tr", [m("th", "Retry"), m("th", "Seconds"), m("th", "Timestamp")])
      ),
      m("tbody", [
        times.map((t, i) => {
          return m("tr", [
            m("td", `${i + 1}`),
            m("td", `${t.seconds}`),
            m("td", `${t.timestamp}`),
          ]);
        }),
      ]),
    ]);
  },
};

m.mount(document.body, App);
