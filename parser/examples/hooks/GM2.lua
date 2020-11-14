
-- Called when the player dies.
-- @hook GM2 ChatText
-- @clientside
-- @tparam number index The index of the player.
-- @tparam string name The name of the player.
-- @tparam string text The text that is being sent.
-- @tparam string type Chat filter type.
-- @treturn boolean Return true to suppress the chat message.

-- Called whenever a player pressed a key included within the IN keys.
--
-- For a more general purpose function that handles all kinds of input,
-- see GM:PlayerButtonDown.
-- @hook GM2 KeyPress
-- @shared
-- @tparam Player ply The player pressing the key. If running client-side,
-- this will always be LocalPlayer.
-- @tparam number key The key that the player pressed using Enums/IN.

-- Called once when the player is authenticated.
-- @hook GM2 PlayerAuthed
-- @serverside
-- @tparam Player ply The player.
-- @tparam string steamid The player's SteamID.
-- @tparam string uniqueid The player's UniqueID.
