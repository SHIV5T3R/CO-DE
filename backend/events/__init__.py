import pkgutil

# automatically imports every Python module and subpackage inside the views directory 
# when views is imported in the application.
pkg_list = [pkg for pkg in pkgutil.walk_packages(path=__path__, prefix=__name__ + '.')]
# print("pkg list:", pkg_list)
for  importer, modname, ispkg in pkg_list:
    module = __import__(modname)