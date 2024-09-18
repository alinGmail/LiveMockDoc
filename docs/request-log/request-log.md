# about request log 
Livemock will record all requests that match an expectation as a JSON object and display them on the request log page. Below is an example of a recorded object:

``` JSON
{
    "id": 100099, 
    "expectationId": "c26a2cef-8ac7-4ce4-8a4b-595c850488be", 
    "proxyInfo": {
      "isProxy": false,
      "proxyHost": null,
      "proxyPath": null
    }, 
    "req": {
        "body": { }, 
        "headers": {
            "host": "localhost:8088", 
            "connection": "keep-alive", 
            "cache-control": "max-age=0", 
            "upgrade-insecure-requests": "1", 
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36", 
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.7", 
            "accept-encoding": "gzip, deflate, br"
        }, 
        "method": "GET", 
        "path": "/olkioi", 
        "requestDate": "2023-08-04T13:14:51.042Z"
    }, 
    "res": {
        "body": {
            "name": "John", 
            "age": 30, 
            "hobbies": [
                "reading", 
                "hiking", 
                "coding"
            ]
        }, 
        "duration": 0, 
        "headers": {
            "x-powered-by": "Express", 
            "content-type": "text/plain"
        }, 
        "rawBody": "{\"name\":\"John\",\"age\":30,\"hobbies\":[\"reading\",\"hiking\",\"coding\"]}", 
        "responseDate": "2023-08-04T13:14:51.042Z", 
        "status": 200, 
        "statusMessage": "OK"
    }, 
    "meta": {
        "revision": 1, 
        "created": 1691154891042, 
        "version": 0, 
        "updated": 1691154891042
    }, 
    "$loki": 95
}
```

## filter 
### preset filter
livemock provide some preset filter to filter the request log.It is very easy to use.

### custom filter
livemock also provide some custom filter.It is more functional.

## custom column
On the request log page, there are predefined columns such as "Method," "Status," "Body," and "Root." You can also add custom columns with three customizable properties: name, path, and display type.

- `Name`: The name of the column, which is displayed in the table header.
- `Path`: Defines the value of the path of the request log JSON object to show.
- `Display type`: Defines how to display the value. You can display it as text or a JSON tree.

you can also config which column to show,which column to hidden.
