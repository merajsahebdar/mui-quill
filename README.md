# [Material UI][mui] Rich Text Editor

*Based on [Quill][quill]*

## Installation and Usage

```sh
npm install mui-quill
```

```tsx
import {RichTextField} from 'mui-quill';
import {useState} from 'react';

export default function App() {
  const [value, setValue] = useState('');

  return (
    <RichTextField
      value={value}
      onChange={(nextValue) => setValue(nextValue)}
      variant="outlined"
      options={{
        toolbar: true
      }}
    />
  );
}
```

## Todo

- Add Tests
- Add options to customize quill instance

## Credit

- [zenoamaro/react-quill][credit-zenoamaro]

[mui]: https://material-ui.com
[quill]: https://quilljs.com
[credit-zenoamaro]: https://github.com/zenoamaro/react-quill
