
-- The DColorCombo allows the user to choose color, without alpha, using
-- DColorMixer or DColorPalette in a tabbed view.
-- @panel DColorCombo

local DColorCombo = {}

-- Called internally to create panels necessary for this panel to work.
function DColorCombo:BuildControls() end

-- Returns the color of the DColorCombo.
-- @treturn Color The selected color.
function DColorCombo:GetColor() end

-- Returns true if the panel is currently being edited.
--
-- More of a internal method, it technically should only ever work (i.e.
-- return true) inside DColorCombo:OnValueChanged.
-- @treturn boolean True if the panel is currently being edited.
function DColorCombo:IsEditing() end

-- Called when the value (color) of this panel was changed.
-- @tparam Color newcol The new color.
function DColorCombo:OnValueChanged( newcol ) end

-- Sets the color of this panel.
-- @tparam Color clr The new color.
function DColorCombo:SetColor( clr ) end