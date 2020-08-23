
-- The player library is used to get the Lua objects that represent players
-- in-game.
-- @library player
-- @shared

-- Gets all the current players in the server (not including connecting
-- clients).
-- @treturn table All Players currently in the server.
function player.GetAll() end

-- Returns a table of all bots on the server.
-- @treturn table A table only containing bots ( AI / non human players )
function player.GetBots() end

-- Gets the player with the specified AccountID.
-- @tparam number accountID The Player:AccountID to find the player by.
-- @treturn Player Player if one is found, false otherwise
function player.GetByAccountID(accountID) end

-- Gets the player with the specified connection ID.
--
-- Connection ID can be retrieved via gameevent.Listen events.
--
-- For a function that returns a player based on their Entity:EntIndex, see
-- Entity.
--
-- For a function that returns a player based on their Player:UserID, see
-- Player.
-- @tparam number connectionID The connection ID to find the player by.
-- @treturn Player|nil Player if one is found, nil otherwise.
function player.GetByID(connectionID) end

-- Gets the player with the specified SteamID.
-- @tparam string steamID The Player:SteamID to find the player by.
-- @treturn Player Player if one is found, false otherwise.
function player.GetBySteamID(steamID) end


-- Gets the player with the specified SteamID64.
-- @tparam string|number steamID64 The Player:SteamID64 to find the player by.
-- @treturn Player|boolean Player if one is found, false otherwise.
function player.GetBySteamID64(steamID64) end

-- Gets the player with the specified uniqueID (not recommended way to identify
-- players).
-- @tparam string uniqueID The Player:UniqueID to find the player by.
-- @treturn Player|boolean Player if one is found, false otherwise.
function player.GetByUniqueID(uniqueID) end

-- Gives you the player count. Similar to #player.GetAll but with much better
-- performance.
-- @treturn number Number of players.
function player.GetCount() end

-- Returns a table of all human ( non bot/AI ) players.
--
-- Unlike player.GetAll, this does not include bots.
-- @treturn table A table of all human ( non bot/AI ) players.
function player.GetHumans() end
