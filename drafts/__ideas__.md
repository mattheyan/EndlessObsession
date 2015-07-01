IDEAS
=====

Software Problems
-----------------

Generally people/personal problems, not technical
Acccumulating complexity allowed to morph into big ball of mud
Changing requirements and code, not always together
Knowing why things were done the way they were
Remember what you (or a collegue) knew months or years ago
Fix one thing, break 10 others

Ultimate Guide to Automation and Scripting on Windows
-----------------------------------------------------

Chocolatey
BoxStarter
PowerShell

Versioning concerns
-------------------

Software/Product, Tool, Library

Reconciling semver & System.Version, product version vs. package version, and
packages for auto-updating software.

For choco, if you can dynamically install the latest x.y, maybe major.minor is
all that should matter. Otherwise matching the software version is OK. If the
software auto-updates, maybe we should use version 0.* to indicate the
unpredictability and the fact that its not tied to the software version?

http://semver.org/
https://msdn.microsoft.com/en-us/library/system.reflection.assemblyversionattribute_methods(v=vs.110).aspx
http://stackoverflow.com/questions/3098167/why-is-system-version-in-net-defined-as-major-minor-build-revision
