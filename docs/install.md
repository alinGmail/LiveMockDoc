---
sidebar_position: 2
---

# 🛠️ Installation

There are two versions of liveMock, one is a desktop application and the other is a web service. You can use either version, but I recommend using the desktop version.

### Installation of the desktop version

To install the desktop version, simply download from the [release page](https://github.com/alinGmail/LiveMock/releases). It supports both macOS and Windows operating systems.

### Installation of the web service version

#### 1.clone the project

```
git clone git@github.com:alinGmail/LiveMock.git
```

#### 2.install dependencies

```
cd LiveMock
yarn install
```

#### 3.build the forntEnd code

```
yarn workspace front-end build
```

#### 4.run the project

```
yarn workspace back-end start
```

the server will running at http://localhost:9002
