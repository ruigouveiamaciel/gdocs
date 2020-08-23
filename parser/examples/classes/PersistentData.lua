
-- Used to store persistent data between different sessions and servers.
-- @class PersistentData
-- @shared
-- @field string path Path of the file the data is stored in.

--- Creates a PersistentData using the given file.
--
-- @constructor
-- @name sKore.PersistentData
-- @tparam string path The path of the file to store the data in.
local function constructor(self, path)
end

local PersistentData = {}
PersistentData.__index = PersistentData
setmetatable(PersistentData, { __call = constructor })
sKore.PersistentData = PersistentData

--- Loads/reloads data from the data file.
-- @treturn PersistentData Returns itself.
function PersistentData:load() end

--- Stores data in the data file.
-- @treturn PersistentData Returns itself.
function PersistentData:save() end
