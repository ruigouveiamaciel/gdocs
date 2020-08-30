
-- This comment will be a block without a name and a warning will be thrown.
local varName = true

/* This comment will not be considered a block. */
local varName = true

-- This comment will not be considered a block. @ignore
-- The ignore tag can go anywhere in the text. Even in the middle.
local varName = true

-- This won't be considered a function doc. @ignore
function multiply() end
