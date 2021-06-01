# modal-custom.min.js

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


## Components

### Alert with string

``` javascript

    const { Modal } = LineModal;

    modal.alert('Hello world');


```

### Alert with object

``` javascript

    const { Modal } = LineModal;

    modal.alert({
        msg: 'Hello world'
    });

```

### Confirm

``` javascript

    const { Modal } = LineModal;

    modal.alert({
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

    const { Modal } = LineModal;

    modal.alert({
        msg: 'Where are you?',
        onOk: (val) => {
            console.log(val)
        },
        onCancel: () => {
            console.log('Im from nowhere')
        }
    });

```

## Config / Option

When creating a new Object of an Alert, Prompt, or Confirm, this object has a few options that you can change.

key | description | type | mandatory|
----|-----------|----|-----|
msg | Message | string | true |
class | Class in html | string | false |
styles | Styles of modal wrapper | string | false |
textOk | Text for the submit button | string | false |
textCancel | Text for the cancel button | string | false |
textPlaceholder | Placeholder text (prompt) | string | false |
onOk | Fires when a user has accepted | (value: string) => string | true |
onCancel | Fires when a user has canceled | func | true |

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

