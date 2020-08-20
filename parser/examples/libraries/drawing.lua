
--- Drawing related functions.
-- @library Drawing
-- @clientside

--- Generates a table with all the points to draw a circle.
--
-- @tparam number x The x coordinate of the circle's center.
-- @tparam number y The y coordinate of the circle's center.
-- @tparam number radius The radius of the circle.
-- @treturn table A table containing the vertices to draw the given circle.
function sKore.getCircleVertices(x, y, radius)
end

--- Draws the given circle.
--
-- @tparam number x The x coordinate of the circle's center.
-- @tparam number y The y coordinate of the circle's center.
-- @tparam number radius The radius of the circle.
function sKore.drawCircle(x, y, radius)
end

--- Generates a table to generate a circular rectangle with the given
-- characteristics.
--
-- @tparam number x The x coordinate of the top left of the box.
-- @tparam number y The y coordinate of the top left of the box.
-- @tparam number width The width of the rectangle.
-- @tparam number height The height of the rectangle.
-- @treturn table The table with all the vertices.
function sKore.circularBoxVertices(x, y, width, height)
end

--- Color Enums
-- @enum Colors
-- @field number sKore.LIGHT Represents light colors/themes.
-- @field number sKore.DARK Represents dark colors/themes.
sKore.LIGHT = 1
sKore.DARK = 2

--- Text Emphasis Enums
-- @enum TextEmphasisEnums
-- @field number sKore.HIGH_EMPHASIS High text emphasis. This is what you will use the
-- most.
-- @field number sKore.MEDIUM_EMPHASIS Medium text emphasis.
-- @field number sKore.DISABLED_EMPHASIS Disabled text emphasis.
sKore.HIGH_EMPHASIS = 1
sKore.MEDIUM_EMPHASIS = 2
sKore.DISABLED_EMPHASIS = 3
