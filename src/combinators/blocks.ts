import {Streams, C, F, TupleParser} from "@masala/parser"

const whitespace = C.charIn(" \t").optrep()
const newline = C.stringIn(["\r\n", "\n"])
const newline_eof = F.try(newline).or(F.eos())
const text = F.not(newline_eof).optrep().map<string>(x => x.join(""))
const block_comment = C.string("--")
const line = text.then(newline.drop())
const line_eof = text.then(newline_eof.drop())

const block_line = whitespace
    .then(block_comment.drop())
    .then(line_eof)

const block = block_line.rep().map<string>(x => x.join("\n"))

const blocks = F.try(block).or(line.returns(undefined)).rep()

const a = blocks.parse(Streams.ofString(`-- This library is used internally by Garry's Mod to help keep track of
-- achievement progress and unlock the appropriate achievements once a certain
-- number is reached.
-- @library achievements
-- @clientside

-- Adds one to the count of balloons burst. Once this count reaches 1000,
-- the 'Popper' achievement is unlocked.
function achievements.BalloonPopped() end

-- Returns the amount of achievements in Garry's Mod.
-- @treturn number The amount of achievements available.
function achievements.Count() end

-- Adds one to the count of balls eaten. Once this count reaches 200,
-- the 'Ball Eater' achievement is unlocked.
function achievements.EatBall() end

-- Retrieves progress of given achievement.
-- @tparam number achievementID The ID of achievement to retrieve progress of.
-- Note: IDs start from 0, not 1.
-- @treturn number The achievement progress for the given achievementID.
-- Note: Non-progress based achievements will have 0, even if they are
-- completed.
-- @example Will print achievement progress for all of your achievements into
-- console.
-- \`\`\`lua
-- for i = 0, achievements.Count() - 1 do
--     print( achievements.GetCount(i) )
-- end
-- \`\`\`
function achievements.GetCount(achievementID) end

-- Retrieves description of given achievement.
-- @tparam number achievementID The ID of achievement to retrieve progress of.
-- Note: IDs start from 0, not 1.
-- @tparam string Description of an achievement.
-- @example Will print achievement descriptions for all of your achievements
-- into console.
-- \`\`\`lua
-- for i = 0, achievements.Count() - 1 do
--     print( achievements.GetDesc(i) )
-- end
-- \`\`\`
function achievements.GetDesc(achievementID) end

-- Retrieves progress goal of given achievement.
-- @tparam number achievementID The ID of achievement to retrieve progress of.
-- Note: IDs start from 0, not 1.
-- @treturn number Progress goal of an achievement.
function achievements.GetGoal(achievementID) end

-- Retrieves name of given achievement.
-- @tparam number achievementID The ID of achievement to retrieve progress of.
-- Note: IDs start from 0, not 1.
-- @treturn string Name of an achievement.
function achievements.GetName(achievementID) end

-- Adds one to the count of baddies killed. Once this count reaches 1000,
-- the 'War Zone' achievement is unlocked.
function achievements.IncBaddies() end

-- Adds one to the count of innocent animals killed. Once this count reaches
-- 1000, the 'Innocent Bystander' achievement is unlocked.
function achievements.IncBystander() end

-- Adds one to the count of friendly NPCs killed. Once this count reaches 1000,
-- the 'Bad Friend' achievement is unlocked.
function achievements.IncGoodies() end

-- Used in Garry's Mod 12 in the achievements menu to show the user if they have
-- unlocked certain achievements.
-- @tparam number achievementID The ID of achievement to retrieve progress of.
-- Note: IDs start from 0, not 1.
-- @treturn boolean Returns true if the given achievementID is achieved.
function achievements.IsAchieved(AchievementID) end

-- Adds one to the count of things removed. Once this count reaches 5000,
-- the 'Destroyer' achievement is unlocked.
function achievements.Remover() end

-- Adds one to the count of NPCs spawned. Once this count reaches 1000,
-- the 'Procreator' achievement is unlocked.
function achievements.SpawnedNPC() end

-- Adds one to the count of props spawned. Once this count reaches 5000,
-- the 'Creator' achievement is unlocked.
function achievements.SpawnedProp() end

-- Adds one to the count of ragdolls spawned. Once this count reaches 2000,
-- the 'Dollhouse' achievement is unlocked.
function achievements.SpawnedRagdoll() end

-- Adds one to the count of how many times the spawnmenu has been opened.
-- Once this count reaches 100,000, the 'Menu User' achievement is unlocked.
function achievements.SpawnMenuOpen() end
`))


console.log(a.value.array())
