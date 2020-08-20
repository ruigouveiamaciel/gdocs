
--- Used to store persistent data between different sessions and servers.
-- @class PersistentData
-- @shared

--- Creates a PersistentData using the given file.
--
-- @constructor
-- @name sKore.PersistentData
-- @tparam string path The path of the file to store the data in.
local function constructor(self, path)
    if sKore.debug then
        sKore.Validator({"required|String|nonempty"}):Validate({path})
    end

    path = sKore.cleanPath(path)
    local instance = {
        __path = path
    }
    setmetatable(instance, sKore.PersistentData )

    local directory = string.Explode("/", path)
    if #directory > 1 then
        directory = table.concat(directory, "/", 1, #directory - 1)
        if file.Exists(directory, "DATA") then
            if !file.IsDir(directory, "DATA") then
                file.Delete(directory)
                file.CreateDir(directory)
            end
        else
            file.CreateDir(directory)
        end
    end

    instance:load()

    return instance
end

local PersistentData = {}
PersistentData.__index = PersistentData
setmetatable(PersistentData, { __call = constructor })
sKore.PersistentData = PersistentData

--- Loads/reloads data from the data file.
-- @treturn PersistentData Returns itself.
function PersistentData:load()
    local path = self.__path
    table.Empty(self)
    table.Merge(self, util.JSONToTable(file.Read(path) or "") or {})
    self.__path = path
    return self
end

--- Stores data in the data file.
-- @treturn PersistentData Returns itself.
function PersistentData:save()
    local path = self.__path
    self.__path = nil
    file.Write(path, util.TableToJSON(self))
    self.__path = path
    return self
end
