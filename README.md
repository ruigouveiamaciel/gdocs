# gdocs - A Garry's Mod Lua Documentation Tool

Documentation generator for Garry's Mod addons. You can have a look at the example [here](https://ruigouveiamaciel.github.io/gdocs/#/).

If you want to see examples of docummentation blocks you can check them [here](https://github.com/ruigouveiamaciel/gdocs/tree/master/parser/examples).

**Notice!** This project is still not finished, there's a lot of missing features and existing features might change in the future. Feel free to contribute with ideas and code.

## Requirements

- [Node.js](https://nodejs.org/) v12 or higher.
- Yarn package manager.

## Installation

1. Install the yarn package manager if you don't have it already.
   ```
   $ npm install yarn -g
   ```

2. Clone the repository.
   ```
   $ git clone https://github.com/ruigouveiamaciel/gdocs.git
   ```

3. Install the dependencies.
   ```
   $ cd gdocs
   $ yarn install
   ```
   
4. Done!

## Example

If you want to run the example on your computer simply run the following command in the root directory of the repository.
```
$ yarn example
```
This will automatically parse all example files and start the React development server.

## Parse Your Own Project

To parse your own project please follow the steps bellow. Its recommended to create a batch or bash file to automate this process.

1. Set your working directory in the parser directory.
   ```
   $ cd parser
   ```

2. Parse your project using the command bellow, you can add as many directories as you want and paths must be relative to the parser directory.

   If any errors occur during this process, read them and fix them.
   ```
   $ yarn parse -d "./examples" -d "../path/to/your/project"
   ```

3. Build the frontend.
   ```
   $ cd ../builder
   $ yarn build
   ```

4. Done! Your project will be available in the build folder inside the builder directory.

## Tags Syntax

In gdocs tags follow the following syntax.

- Tags that have no required arguments should have nothing after the tag.
- Tags that require one argument don't require quotes, everything after the tag will be the argument. If quotes are inserted they will be part of the argument.
- Tags that require more than one argument will match one word to an argument, except for the last one which will match everything else just as explained above.
- If you want to provide an argument (that is not the last one) with more than one word you have to surround it by quotes.

#### Example

The following tag expects 3 arguments.
```lua
-- @tagName argument1 argument2 argument3
-- @tagName argument1 "This is the argument 2" This is the argument 3. The last argument doesn't require quotes to have more than one word.
-- @tagName "This is argument one" 'This is argument 2. You can mix quote types.' This is argument 3.

-- @tagName "This is argument 
-- 1" "Argument 2" You can break your tag into multiple 
-- lines. Line breaks will be replaced by a space.
```

## Documentation Blocks

Documentation blocks must always have `--` on the beggining of the line and can span multiple lines as long the next one also starts with `--`.

Blocks can contain any amount of tags and a description.

Tags must start at the beggining of a line (after the `--`) to be valid.

#### Example

```lua
-- This is a description. The description must always come on top of the
-- documentation block.
--
-- This is a new paragraph, to make a new paragraph separate the text by
-- an empty line.
-- @library Example
-- @clientside

-- This is a function description.
--
-- Because there is a function beneath this block, the tag '@name <function name>'
-- will be added automaticlly, replacing <function name> the the corresponding
-- function name.
--
-- @tparam number a The first number.
-- @tparam number b The second number.
-- @treturn number The addition of the 2 given numbers.
function addition(a, b)
   return a + b
end
```

For more examples check the [examples folder](https://github.com/ruigouveiamaciel/gdocs/tree/master/parser/examples).

## Global Tags

Global tags are a way to define tags that we want to appear on every documentation block beneath it.

Some tags, for example, the `@example` tag, won't appear on every documentaation block beneath it, for obvious reasons. 

#### Example

```lua
-- All of the tags belows, except for @global will be included in all the blocks bellow.
--
-- And because this block contains @global and @subcategory tags this will define the
-- description for the Math library.
--
-- @global
-- @category libraries
-- @subcategory Math

-- This function will now have '@category libraries' and '@subcategory Math'
-- because of the block above.
--
-- @tparam number a The first number.
-- @tparam number b The second number.
-- @treturn number The addition of the 2 given numbers.
function addition(a, b)
   return a + b
end
```

## Available Tags

| Tag  | Allowed as global | Description |
| ------------- | ------------- | ------------- | 
| `@global` | no | Sets the current block as a global block. |
| `@name <name>` | no | The name of the element that we're documenting, could be a function, table, hook, etc. Has to exist on every block except in global blocks. This tag is usually auto generated from code or previous tags. |
| `@category <category name>` | yes | Specifies the category this block belongs to, if no tag is provided, defaults to the default category. |
| `@subcategory <subcategory name>` | yes | Specifies the subcategory this block belongs to, does nothing if the provided category doesn't have subcategories. |
| `@realm <client|shared|server>` | yes | Specifies the realm of this block. Options are: `client`, `server` and `shared`. |
| `@example <example>` | no | An example. The text provided will be processed using markup. |
| `@field <type> <key> <description>` | no | Used to specify panel attributes, table elements, enums, structs, etc. |
| `@tparam <type> <name> <description>` | no | Defines a function parameter. Types can be divided with the following syntax: `type1|type2|type3` |
| `@treturn <type>` | no | Defines a function return. Types can be divided the same way as `@tparam`. |

Alias tags deconstruct into normal tags. They're a way to write cleaner blocks.

| Alias Tag  | Same as | Description |
| ------------- | ------------- | ------------- | 
| `@clientside` | `@realm client` | Sets the realm to clientside. |
| `@serverside` | `@realm server` | Sets the realm to serverside. |
| `@shared` | `@realm shared` | Sets the realm to shared. |
| `@constructor` | `@category global` | Sets the current block as a class contructor. |
| `@globals` | `@global`, `@category globals` | All the function below this block will go under the Globals category.  |
| `@class <class name>` | `@global`, `@category classes`, `@subcategory <class name>` | Defines a class. All function definitions bellow will be considered methods except if they have the `@constructor` tag. |
| `@library <library name>` | `@global`, `@category libraries`, `@subcategory <library name>` | Defines a library. All function definitions bellow will be consired part of the library. |
| `@hookcat <hook category name>` | `@global`, `@category hooks`, `@subcategory <hook category name>` | Defines a hook category. All function definitions below this block will be considered hooks. |
| `@panel <panel name>` | `@global`, `@category panels`, `@subcategory <panel name>`, `@realm client` | Defines a class. All functions bellow this block will be considered a method. |
| `@enum <enum name>` | `@category enums`, `@name <enum name>` | Defines an enum. `@field` tags should be added to this block. |
| `@struct <struct name>` | `@category structs`, `@name <struct name>` | Defines a struct. `@field` tags should be added to this block. |

For examples of how to use this tags, please check the [examples folder](https://github.com/ruigouveiamaciel/gdocs/tree/master/parser/examples).
