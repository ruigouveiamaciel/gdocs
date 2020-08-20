
-- This directs all drawing to be done to a certain 2D or 3D plane or position,
-- until the corresponding "End" function is called.
-- The matrix functions exist, but are mostly unusable unless you're familiar
-- with the source engine's layout for each aspect.
-- @library cam
-- @clientside

-- Shakes the screen at a certain position.
-- @tparam Vector pos Origin of the shake.
-- @tparam Angle pos Angles of the shake.
-- @tparam number pos The shake factor.
function cam.ApplyShake(pos, angles, factor) end

-- Switches the renderer back to the previous drawing mode from a 2D context.
function cam.End2D() end

-- Switches the renderer back to the previous drawing mode from a 3D context.
function cam.End3D() end

-- Switches the renderer back to the previous drawing mode from a 3D2D context.
function cam.End3D2D() end

-- Switches the renderer back to the previous drawing mode from a 3D
-- orthographic rendering context.
function cam.EndOrthoView() end

-- Returns the currently active model matrix.
function cam.GetModelMatrix() end

-- Tells the renderer to ignore the depth buffer and draw any upcoming
-- operation "ontop" of everything that was drawn yet.
-- @tparam boolean ignoreZ Determines whenever to ignore the depth buffer or
-- not.
function cam.IgnoreZ(ignoreZ) end

-- Pops the current active rendering matrix from the stack and reinstates the
-- previous one.
function cam.PopModelMatrix() end


-- Pushes the specified matrix onto the render matrix stack. Unlike opengl,
-- this will replace the current model matrix.
-- @tparam VMatrix matrix The matrix to push.
-- @tparam boolean multiply If set, multiplies given matrix with currently
-- active matrix (cam.GetModelMatrix) before pushing.
-- @example Rotates and scales text in the center of the screen.
-- ```lua
-- hook.Add("HUDPaint", "2d rotation test", function()
--     local w, h = ScrW(), ScrH()
--     local t = RealTime()*50
--
--     local mat = Matrix()
--
--     mat:Translate(Vector(w/2, h/2))
--     mat:Rotate(Angle(0,t,0))
--     mat:Scale(Vector(1,1,1) * math.sin(t/100) *10)
--     mat:Translate(-Vector(w/2, h/2))
--
--     cam.PushModelMatrix(mat)
--     surface.SetFont("DermaDefault")
--         surface.SetTextColor(255, 255, 255, 255)
--         surface.SetTextPos(w/2, h/2)
--         surface.DrawText("LOLLOLOLOL")
--     cam.PopModelMatrix()
-- end)
-- ```
-- @example Simple function to draw rotated text.
-- ```lua
-- function draw.TextRotated(text, x, y, color, font, ang)
--     render.PushFilterMag(TEXFILTER.ANISOTROPIC)
--     render.PushFilterMin(TEXFILTER.ANISOTROPIC)
--     surface.SetFont(font)
--     surface.SetTextColor(color)
--     surface.SetTextPos(0, 0)
--     local textWidth, textHeight = surface.GetTextSize( text )
--     local rad = -math.rad( ang )
--     x = x - ( math.cos( rad ) * textWidth / 2 + math.sin( rad ) * textHeight / 2 )
--     y = y + ( math.sin( rad ) * textWidth / 2 + math.cos( rad ) * textHeight / 2 )
--     local m = Matrix()
--     m:SetAngles(Angle(0, ang, 0))
--     m:SetTranslation(Vector(x, y, 0))
--     cam.PushModelMatrix(m)
--         surface.DrawText(text)
--     cam.PopModelMatrix()
--     render.PopFilterMag()
--     render.PopFilterMin()
-- end
-- ```
function cam.PushModelMatrix(matrix, multiply) end

-- Sets up a new rendering context. This is an extended version of cam.Start3D
-- and cam.Start2D. Must be finished by cam.End3D or cam.End2D.
function cam.Start(dataTbl) end

-- Sets up a new 2D rendering context. Must be finished by cam.End2D.
--
-- This is almost always used with a render target from the render. To set its
-- position use render.SetViewPort with a target already stored.
function cam.Start2D() end

-- Sets up a new 3D rendering context. Must be finished by cam.End3D.
--
-- For more advanced settings such as an orthographic view, use cam.Start
-- instead.
-- @tparam Vector pos Render cam position.
-- @tparam Angle angles Render cam angles.
-- @tparam number fov Field of view.
-- @tparam number x X coordinate of where to start the new view port.
-- @tparam number y Y coordinate of where to start the new view port.
-- @tparam number w Width of the new viewport.
-- @tparam number h Height of the new viewport.
-- @tparam number zNear Distance to near clipping plane.
-- @tparam number zFar Distance to far clipping plane.
-- @example Set up a 3D rendering environment in a 2D rendering hook to render
-- models on HUD.
-- ```lua
-- hook.Add("HUDPaint", "3d_camera_example", function()
--     cam.Start3D()
--         for id, ply in ipairs(player.GetAll()) do
--             ply:DrawModel()
--         end
--     cam.End3D()
-- end)
-- ```
function cam.Start3D(pos, angles, fov, x, y, w, h, zNear, zFar) end

-- Sets up a new 2D rendering context. Must be finished by cam.End3D2D.
-- This function pushes a new matrix onto the stack. (cam.PushModelMatrix)
-- @tparam Vector pos Origin of the 3D2D context, ie. the top left corner,
-- (0, 0).
-- @tparam Angle angles Angles of the 3D2D context. +x in the 2d context
-- corresponds to +x of the angle (its forward direction). +y in the 2d context
-- corresponds to -y of the angle (its right direction).
--
-- If (dx, dy) are your desired (+x, +y) unit vectors, the angle you want is
-- dx:AngleEx(dx:Cross(-dy)).
-- @tparam number scale The scale of the render context. If scale is 1 then 1
-- pixel in 2D context will equal to 1 unit in 3D context.
-- @example Makes a floating rectangle with text above where the player is
-- looking at, pointing at the player
-- ```lua
-- hook.Add("PostDrawOpaqueRenderables", "example", function()
--     -- Get the game's camera angles
--     local angle = EyeAngles()
--
--     -- Only use the Yaw component of the angle
--     angle = Angle( 0, angle.y, 0 )
--
--     -- Apply some animation to the angle
--     angle.y = angle.y + math.sin( CurTime() ) * 10
--
--     -- Correct the angle so it points at the camera
--     -- This is usually done by trial and error using Up(), Right() and Forward() axes
--     angle:RotateAroundAxis( angle:Up(), -90 )
--     angle:RotateAroundAxis( angle:Forward(), 90 )
--
--     -- A trace just for a position
--     local trace = LocalPlayer():GetEyeTrace()
--     local pos = trace.HitPos
--
--     -- Raise the hitpos off the ground by 20 units and apply some animation
--     pos = pos + Vector( 0, 0, math.cos( CurTime() / 2 ) + 20 )
--
--     -- Notice the scale is small, so text looks crispier
--     cam.Start3D2D( pos, angle, 0.1 )--
--         -- Get the size of the text we are about to draw
--         local text = "Testing"
--         surface.SetFont( "Default" )
--         local tW, tH = surface.GetTextSize( "Testing" )
--
--         -- This defines amount of padding for the box around the text
--         local pad = 5
--
--         -- Draw a rectable. This has to be done before drawing the text, to prevent overlapping
--         -- Notice how we start drawing in negative coordinates
--         -- This is to make sure the 3d2d display rotates around our position by its center, not left corner
--         surface.SetDrawColor( 0, 0, 0, 255 )
--         surface.DrawRect(-tW / 2 - pad, -pad, tW + pad * 2, tH + pad * 2)
--
--         -- Draw some text
--         draw.SimpleText("Testing", "Default", -tW / 2, 0, color_white)
--     cam.End3D2D()
-- end)
-- ```
function cam.Start3D2D(pos, angles, scale) end

-- Sets up a new 3d context using orthographic projection.
-- @tparam number leftOffset The left plane offset.
-- @tparam number topOffset The top plane offset.
-- @tparam number rightOffset The right plane offset.
-- @tparam number bottomOffset The bottom plane offset.
function cam.StartOrthoView(leftOffset, topOffset, rightOffset, bottomOffset) end
