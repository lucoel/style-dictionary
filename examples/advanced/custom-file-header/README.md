## Custom File Header

Style Dictionary 3.0 added the ability to define custom file headers for files generated from formats. A file header is a comment at the beginning of the generated file that has some information about how it was generated. This is fairly common in build tools that output source code. Before 3.0 you could only show or hide this header in the built-in formats. Now you can write your own custom file header messages that can be used in built-in formats as well as custom formats. 

Use cases include:

- Using a version number in the file header comment so that you can check in files generated by Style Dictionary to git
- Using a hash of the source in the file header comment so that the comment doesn't change unless there is a change to the source. This is also helpful if you are checking in your generated files to git so the comment doesn't change after every build.
- Using your own custom message


#### Running the example

First of all, set up the required dependencies running the command `npm ci` in your local CLI environment (if you prefer to use *yarn*, update the commands accordingly).

At this point, you can run `npm run build`. This command will generate output files in the `build` folder. Just to show how file headers work, this example outputs a bunch of files with the same code, but different file header comments. 


#### How does it work

There are 3 ways to add a custom file header:

1. Using the `registerFileHeader` method, and then referencing the name in the file configuration.
1. Adding a `fileHeader` object to the Style Dictionary configuration, and then referencing the key in the file configuration
1. Writing the `fileHeader` as a function in the platform or file configuration

This example codebase has all 3 methods for you to see which works best for you. All 3 methods are in the [**build.js**](/build.js) file. 

A file header is a function that returns an array of strings. This array of strings will get mapped to lines in a comment at the beginning of a file generated by a formatter. The formatter will take care of how to format the lines in the proper comment style (`//`, `/* */`).

You can reference the file header in a custom format as well by using the `fileHeader` function in `StyleDictionary.formatHelpers`, as shown below: 

```javascript
const {fileHeader} = StyleDictionary.formatHelpers;

const myCustomFormat = ({ dictionary, file }) => {
  return `${fileHeader({file, commentStyle: 'short'})}${dictionary.allProperties.map(token => {
    return `--${token.name}: ${token.value};`
  }).join(`\n`)}`
}
```

#### What to look at

* **build.js** Has everything you need