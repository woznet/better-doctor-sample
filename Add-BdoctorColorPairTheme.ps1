<#
.SYNOPSIS
Registers the Better Doctor light theme in the SharePoint 2.0.0 color pair format.

.DESCRIPTION
Reads the accent and background color pairs from bdoctor-light-color-pairs.json and
registers them as a tenant theme with Add-SPOTheme -ColorPairs. SharePoint builds the
theme palette from the first pair, so this theme is an alternative to bdoctor-light,
not an update of it. Only light mode color pairs are supported.

Connect to the SharePoint admin center with Connect-SPOService before running it.

.PARAMETER Name
The name the theme is registered under.

.PARAMETER Path
The color pairs file. Defaults to bdoctor-light-color-pairs.json next to this script.

.PARAMETER Overwrite
Replaces an existing theme with the same name.

.EXAMPLE
Connect-SPOService -Url https://contoso-admin.sharepoint.com
.\Add-BdoctorColorPairTheme.ps1 -Overwrite

.OUTPUTS
System.Management.Automation.PSCustomObject
#>
[CmdletBinding(SupportsShouldProcess)]
[OutputType([pscustomobject])]
param (
    [Parameter()]
    [ValidateNotNullOrEmpty()]
    [string]$Name = 'bdoctor-light-pairs',

    [Parameter()]
    [ValidateScript({ Test-Path -LiteralPath $_ -PathType Leaf })]
    [string]$Path = (Join-Path -Path $PSScriptRoot -ChildPath 'bdoctor-light-color-pairs.json'),

    [Parameter()]
    [switch]$Overwrite
)

try {
    $definition = Get-Content -LiteralPath $Path -Raw -ErrorAction Stop | ConvertFrom-Json -ErrorAction Stop

    $light = @(
        foreach ($pair in $definition.light) {
            @{
                accentColor     = $pair.accentColor
                backgroundColor = $pair.backgroundColor
            }
        }
    )

    if ($light.Count -lt 1 -or $light.Count -gt 16) {
        throw ('{0} holds {1} color pairs; SharePoint accepts 1 to 16.' -f $Path, $light.Count)
    }

    $addParams = @{
        Identity    = $Name
        ColorPairs  = @{ light = $light }
        Overwrite   = $Overwrite
        ErrorAction = 'Stop'
    }

    $description = ('Registering theme "{0}" with {1} color pairs.' -f $Name, $light.Count)
    $warning = ('Register theme "{0}" with {1} color pairs?' -f $Name, $light.Count)
    if ($PSCmdlet.ShouldProcess($description, $warning, 'Add-SPOTheme')) {
        Add-SPOTheme @addParams

        [pscustomobject]@{
            Name        = $Name
            ColorPairs  = $light.Count
            Overwritten = $Overwrite.IsPresent
        }
    }
} catch {
    $PSCmdlet.ThrowTerminatingError($_)
}
