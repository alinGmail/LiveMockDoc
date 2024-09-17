---
sidebar_position: 2
---

### How to create matcher

after create the expectation, in the expectation page, click the 'Add Matcher' button in the matchers column.

### config the matcher

The matcher consists of three parts: match-type, comparator, and match-value. These three parts determine whether a request can be matched. Now livemock supports five match types, which are:

- `method`: the method of the request, such as GET, POST, PUT, etc.
- `path`: the path of the request, the path is start with `/`,like `/student/123`
- `header`: the headers of the request
- `query`: the parameters in the request URL
- `param`: the parameters in the request body

livemock has many matcher comparator, which are:

- `IS`: the request value is equal to the match value.
- `IS_NOT`: the request value is not equal to the match value.
- `CONTAINS`: the request value contain the match value.
- `NOT_CONTAINS`: the request value not contain the match value.
- `START_WITH`: the request value start with the match value.
- `END_WITH`: the request value end with the match value.
- `MATCH_REGEX`: the request value match the match value as a regex.
- `NOT_MATCH_REGEX`: the request value not match the match value as a regex.
- `SHOWED`: the request value was showed.
- `NOT_SHOWED`: the request value was not showed.
- `MATCH_GLOB`: the request value match the match value as a [glob pattern](<https://en.wikipedia.org/wiki/Glob_(programming)>).
- `NO_MATCH_GLOB`: the request value match the match value as a [glob pattern](<https://en.wikipedia.org/wiki/Glob_(programming)>).

Here are some examples of matchers:

- `path START_WITH /book/`: matches all request paths that start with `/book/`.
- `query teacher_name CONTAINS tom`: matches all requests that have a `teacher_name` query parameter, and the value of the `teacher_name` query parameter contains "tom".
- `param teacher_name IS tom`: matches all requests that have a body, and the body has a `teacher_name` parameter,value is `tom`. For example, a request with a JSON body like the one below:

```json
{
  "teacher_name": "tom"
}
```
