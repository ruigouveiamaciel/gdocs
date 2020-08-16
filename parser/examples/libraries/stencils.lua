
--- Functions to make the use of stencils easier and faster.
--@library Stencils
--@clientside

--- Starts a stencil. Everything draw after this will be the set as the shape.
--@tparam boolean inverted Inverts the shape if set to true. Every space not
--drawn will be the shape. Defaults to false.
--@example ```lua
--local test = true
--```
function sKore.StartStencil(inverted)
end

--- Stops drawing the stencil shape and start drawing the content that will be
-- clipping to fit inside the drawn shape.
function sKore.DrawStencil()
end

--- Finishes the stencil.
function sKore.EndStencil()
end
