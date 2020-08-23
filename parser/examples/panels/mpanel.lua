
-- Base panel for all elements.
-- @panel MPanel

local PANEL = {}

table.Merge(PANEL, sKore.elevationGAS)
table.Merge(PANEL, sKore.shadowGAS)
table.Merge(PANEL, sKore.enabledGAS)

function PANEL:Init()
	self:SetElevation(2)
	self:SetShadowOffsetX(1)
	self:SetShadowOffsetY(1)
	self:SetPaintShadow(true)
	self:SetDrawShadows(true)
	self:SetDrawGlobalShadows(true)
	self:SetEnabled(true)

	local parent = self:GetParent()
	if parent.AddShadow then parent:AddShadow(self) end
	self.frame = sKore.getFrame(self)
end

--- Returns the background color. If this panels has a transparent background,
-- invoke this on the parent and return its value.
--
-- If no background color is found, the default color is returned.
-- @treturn Color The background color.
function PANEL:GetBackgroundColor()
end

--- Sets the background color.
--
-- If set to nil, then the panel is considered transparent.
-- @tparam Color|nil color The background color.
function PANEL:SetBackgroundColor(color)
end

derma.DefineControl("MPanel", "", PANEL, "Panel")
