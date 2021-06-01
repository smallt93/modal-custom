# modal-custom

> This library will be released soon as 1.0 with a whole new codebase! Stay tuned!

A vanilla js library for creating alerts, confirm, and prompt.

---

## Need help?
Create an issue or write me tri.nguyen@linecorp.com

## Install

Install modal-custom is quite easy.

### Install script

Just include the script `dist/modal-custom.min.js` into your project and put the script before the closing body tag.

``` html
<html>
  <body>
    <script src="../dist/modal-custom.min.js"></script>
  </body>
</html>

```

## How to use

``` javascript

  const { Modal } = LineModal;

  const modal = new Modal();

```

### Alert with string

``` javascript

  modal.alert('Hello world');

```

### Alert with object

``` javascript

  modal.alert({
    msg: 'Hello world'
  });

```

### Confirm

``` javascript

  modal.confirm({
    msg: 'Are you sure?',
    onOk: () => {
      console.log('Sure')
    },
    onCancel: () => {
      console.log('Not yet')
    }
  });

```

### Prompt

``` javascript

  modal.prompt({
    msg: 'Where are you?',
    onOk: (val) => {
      console.log(val)
    },
    onCancel: () => {
      console.log('Im from nowhere')
    }
  });

```

### Styling

You can use `styles` to custom modal wrapper

``` javascript

  modal.alert({
    styles: `
      margin: 5px;
      padding: 8px;
      display: inline-block;
    `,
  });

```

Or use `class` to set your style by class

``` javascript

  modal.alert({
    class: 'my-modal-wrapper',
  });

```

## Config / Option


When creating a new Object of an Alert, Prompt, or Confirm, this object has a few options that you can change.


key | description | type | mandatory|
----|-----------|----|-----|
msg | Message | string | `"window.location.origin" says` |
class | Class in html | string |  |
styles | Styles of modal wrapper | string | |
textOk | Text for the submit button | string | Ok |
textCancel | Text for the cancel button | string | Cancel |
textPlaceholder | Placeholder text (prompt) | string |  |
onOk | Fires when a user has submited | (value: string) => string | - |
onCancel | Fires when a user has canceled | func | - |
okStyle | Styles of submit button | string |  |
cancelStyle | Styles of cancel button | string |  |
buttonType | Modal includes several predefined button styles, can be set to `primary`, `danger`, `success`, `secondary`, `warning` | string | `primary` |
render | Custom modal content render | () => `node` | - |
footer | Custom footer content render | () => `node` | - |

## Questions
For questions and support feel free to create an issue or write an email to
tri.nguyen@linecorp.com

## Issues
If you found a bug, then please create an issue. It will help me a lot to make my work better. :)

## Contribution
Pull requests are always welcome. I am always happy to see others working on
my GitHub projects.

## Get in touch
Write an email to tri.nguyen@linecorp.com :)

