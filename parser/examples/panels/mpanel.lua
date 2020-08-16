
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
	return self.backgroundColor or self:GetParent().GetBackgroundColor
		   and self:GetParent():GetBackgroundColor()
		   or sKore.activeTheme:getBackgroundColor(self)
end

function PANEL:Paint(width, height)
	if self.cornerRadius > 0 then
		draw.RoundedBox(
			self.cornerRadius, 0, 0, width, height, self.backgroundColor
		)
	else
		draw.NoTexture()
		surface.SetDrawColor(self.backgroundColor)
		surface.DrawRect(0, 0, width, height)
	end
	sKore.drawShadows(self)
end

function PANEL:PaintShadow(x, y, width, height, color)
	if self.cornerRadius > 0 then
		draw.RoundedBox(self.cornerRadius, x, y, width, height, color)
	else
		draw.NoTexture()
		surface.SetDrawColor(color)
		surface.DrawRect(x, y, width, height)
	end
end

function PANEL:PerformLayout()
	self.cornerRadius = sKore.scale(4 * sKore.cornering)
	self.backgroundColor = sKore.activeTheme:getBackgroundColor(self)
end

derma.DefineControl("MPanel", "", PANEL, "Panel")
