# gdocs - A Garry's Mod Lua Documentation Tool

Documentation generator for Garry's Mod addons. You can have a look at the example [here](https://ruigouveiamaciel.github.io/gdocs/#/).

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

## Tags Syntax

In gdocs tags follow the following syntax.

- Tags that have no required arguments should have nothing after the tag.
- Tags that require one argument don't require quotes, everything after the tag will be the argument. If quotes are inserted they will be part of the argument.
- Tags that require more than one argument will match one word to an argument, except for the last one which will match everything else just as explained above.
- If you want to provide an argument (that is not the last one) with more than one word you have to surround it by quotes.

#### Examples

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

#### Examples

```lua
-- This is a description. The description must always come on top of the
-- documentation block.
--
-- This is a new paragraph, to make a new paragraph separate the text by
-- an empty line.
-- @library Example
-- @clientside
```
