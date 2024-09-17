---
sidebar_position: 3
---

### How to create action

after create the expectation click 'Create Action' button in the actions column.

### Action type

An action defines what the expectation will do. Currently, two actions are supported: custom response and proxy response.
custom response is directly define what you want to response to the request. include header,status code and content.
proxy response will forwards these requests to another URL,get response from the URL,sends these response back to the request.

### property of custom response

- `http status`: the http response status code.
- `response type`: the response type, JSON or TEXT.it will change the "Content-Type" header
- `response headers`: the headers append to the response.
- `content handler`: it will determine how livemock handle the content.you can change it to mock_js,so you can use [mock js grammar](http://mockjs.com/examples.html). for more about mock.js,you can visit [mockjs github page](https://github.com/nuysoft/Mock).

#### use mockjs

### config the proxy response
