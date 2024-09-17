---
sidebar_position: 2
---

### How to create matcher

after create the expectation, in the expectation page, click the 'Add Matcher' button in the matchers column.

### config the matcher

The matcher consists of three parts: match-type, comparator, and value. These three parts determine whether a request can be matched. Now livemock supports five match types, which are:

- `method`: the method of the request, such as GET, POST, PUT, etc.
- `path`: the path of the request, the path is start with `/`,like `/student/123`
- `header`: the headers of the request
- `query`: the parameters in the request URL
- `param`: the parameters in the request body


livemock has 12 matcher comparator, which are:
  - `IS`: 
  - `IS_NOT`: the method of the request, such as GET, POST, PUT, etc.
  - `CONTAINS`: the method of the request, such as GET, POST, PUT, etc.
  - `NOT_CONTAINS`: the method of the request, such as GET, POST, PUT, etc.




Here are some examples of matchers:

- `path START_WITH /book/`: matches all request paths that start with `/book/`.
- `query teacher_name CONTAINS tom`: matches all requests that have a `teacher_name` query parameter, and the value of the `teacher_name` query parameter contains "tom".
- `param teacher_name IS tom`: matches all requests that have a body, and the body has a `teacher_name` parameter,value is `tom`. For example, a request with a JSON body like the one below:

```json
{
  "teacher_name": "tom"
}
```
