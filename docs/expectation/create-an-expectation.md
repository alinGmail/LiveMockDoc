---
sidebar_position: 1
---

### What is expectation

An expectation consists of several matchers and an action. When a request matches all its matchers, the defined action will be taken, such as responding with a JSON.

### How to create expectation

To create an expectation, goto the expectation list page and click the "Add Expectation" button. After that, you will see the newly created expectation in the list.

### property of an expectation

- `delay`: the delay time of the response,unit is ms.
- `priority`: the expectation has highter priority will matcher first.
- `activate`: if the expectation is inactivate, it will be skip when the request match.
- `matchers`: the matchers of the expectation, if the request match all matchers, the action of the expectation will take.
- `action`: the action of the expectation,it determine the response of the request.currently support two action. custom response and proxy.
