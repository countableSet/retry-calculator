# exponential backoff retry policy calculator

Determined to figure out the timings of spring retry template [exponential back off policy](https://docs.spring.io/spring-retry/docs/api/current/org/springframework/retry/backoff/ExponentialBackOffPolicy.html).

For example, the defaults are the following for the policy:
* The default 'initialInterval' value - 100 millisecs.
* The default maximum backoff time (30 seconds).
* The default 'multiplier' value - value 2 (100% increase per backoff).
* Simple retry policy of 5 attempts

| Retry | Seconds | Timestamp |
|-------|---------|-----------|
|1|0.1|8:40:47 PM:408|
|2|0.3|8:40:47 PM:508|
|3|0.7|8:40:47 PM:708|
|4|1.5|8:40:48 PM:108|
|5|3.1|8:40:48 PM:908|

The goal was to give a general idea of how long the max retry process will take without guessing.