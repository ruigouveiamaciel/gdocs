
-- An object returned by Stack().
--
-- Like a Lua table, a Stack is a container. It follows the principle of LIFO
-- (last in, first out).
--
-- The Stack works like a stack of papers: the first page you put down (push)
-- will be the last one you remove (pop). That also means that the last page you
-- put down, will be the first to be removed.
-- @class Stack
-- @shared

-- Returns a new Stack object
-- @constructor
-- @treturn Stack A brand new stack object.
function Stack() end

-- Pop an item from the stack.
-- @treturn number amount Amount of items you want to pop. Defaults to 1.
function Stack:Pop(amount) end

-- Push an item onto the stack.
-- @tparam any object The item you want to push.
function Stack:Push(object) end

-- Returns the size of the stack.
-- @treturn number The size of the stack.
function Stack:Size() end

-- Get the item at the top of the stack.
-- @treturn any The item at the top of the stack.
function Stack:Top() end
