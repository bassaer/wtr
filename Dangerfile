if git.modified_files.include? "package.json" then
    repo = URI.parse('https://raw.githubusercontent.com/bassaer/wtr/master/package.json')
    master = Net::HTTP.get(repo)
    cur_ver = JSON.load(master)['version']

    pkg_jsn = git.modified_files.select { |path| path.include? "package.json" }
    new_ver = open(pkg_jsn[0]) { |f| JSON.load(f)['version'] }
    if cur_ver != new_ver
        markdown "## bump"
        markdown "```#{cur_ver}``` -> ```#{new_ver}```"
        return
    end
end

warn("version is same in ```package.json```")
