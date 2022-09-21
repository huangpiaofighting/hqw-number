# hqw-number

用于美化数字，支持符号：
1、2、3、4、5、6、7、8、9、-

## 安装

```bash
yarn add hqw-number
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| num | string`|`number | '9' | 数字值 |
| color | string | 'black' | 数字颜色 |
| fontSize | string`|`number | '14' | 数字大小 |
| opacity | number | 1 | 数字透明度 |

## 例子

```javascript
import React from 'react';
import Number from 'hqw-number';

export default function Example() {
  return (
    <>
      <h1>数字示例</h1>
      <Number num="999" color='red' fontSize='20' />
    </>
  );
}
```

## 版本日志

- 1.0.0  创建模型
- 1.0.1  修改README.md 文件
