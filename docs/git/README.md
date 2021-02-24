# Git

## 基础使用

#### 设置用户信息
```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

#### 初始化仓库
```
$ git init
```

#### 添加文件并迁入（修改文件迁入前也需要 `add` ）
```
$ git add file1.txt
$ git add file2.txt file3.txt
$ git commit -m "迁入内容的说明"
```

#### 修改文件名
```
$ git mv file.txt File.txt (首字母改大写)
```

#### 查看仓库状态（查看哪些文件被修改过，是否可以迁入）
```
$ git status
```

#### 比对文件改动
```
$ git diff file.txt
$ git diff HEAD -- file.txt (工作区与版本库最新版本的区别)
```

#### 显示历史修改记录
```
$ git log (--pretty=oneline: 仅显示版本号和 `-m` 的文字说明)
```

#### 版本回退
```
$ git reset --hard HEAD^
$ git reset --hard commit_id

HEAD: 当前版本
HEAD^: 上版本
HEAD^^: 上上版本
HEAD~100: 上 * 100 版本
commit_id (版本号): 回到指定的版本，也可以是当前版本时间点之后的版本
```

#### 查看历史命令（可用于查看时间点之后的版本号）
```
$ git reflog
```

#### 撤销工作区修改（非暂存区，已 `add` 的内容此命令无法撤销）（可撤销本地误删）
```
$ git checkout -- file.txt
$ git checkout -- .
```

#### 撤销暂存区的内容（ `add` 后， `commit` 前），放回工作区（ `add` 前），再执行上一条以撤销工作区内容
```
$ git reset HEAD file.txt
```

#### 撤销新增的文件（未 `add`）
```
$ git clean [-d: 删除文件夹] [-f] [-n: 查看将被删除的文件]
```

#### 删除版本库文件（删除后需要 `commit` ）（先手动删除文件则可用 `add` 代替）
```
$ git rm file.txt
```

## 远程仓库（GitHub）

#### 创建 SSH Key
```
$ ssh-keygen -t rsa -C "youremail@example.com"
```
文件路径：用户主目录 > `.ssh` 目录 > `id_rsa` (私) + `id_rsa.pub` (公，用于平台 `SSH Keys` 绑定)

#### 先有本地库时，在 `GitHub` 创建仓库后关联（多个远程库时 `origin` 可自定名称用于区分）
```
$ git remote add origin (可自定，一般不改) git@github.com:user-id/reponame.git
```

#### 将本地仓库内容推送到远程库（首次推送使用 `-u` 添加关联）
```
$ git push [-u] <远程库> <本地分支>:<远程分支>

$ git push -u origin master:dev
$ git push -u origin master (<=> master:master)
```

#### 无本地库，先创建远程库，再从远程库克隆内容
```
$ git clone [-b <branch>: 克隆某个分支] git@github.com:user-id/repo-name.git [<本地文件夹命名>]
```

## 分支

#### 创建并切换到分支
```
$ git checkout -b <branch-name>
```
等价于
```
$ git branch <branch-name>
$ git checkout <branch-name>
```

#### 查看分支（分支列表中 `*` 表示当前分支）
```
$ git branch [-r 查看远程所有分支] [-a 查看含远程分支的所有分支]
```

#### 切换分支
```
$ git chechout <branch-name>
```

#### 合并指定分支到当前分支（此方式优先 `fast-forward` 模式合并）
```
$ git merge <branch-name>
```

#### 强制不使用 `fast-forward` 模式合并（会创建一个新的 `commit` ，建议使用此方法，可追溯分支历史）
```
$ git merge --no-ff -m "提交说明" <branch-name>
```

#### 删除分支
```
$ git branch -d <branch-name>
```

#### 强行删除分支（优先使用 `-d` ，分支未完全合并会有提示，如果确实需要删除，则再使用 `-D` ）
```
$ git branch -D <branch-name>
```

#### 删除远程分支
```
$ git push origin --delete <branch-name>
```

#### 查看分支合并图
```
$ git log --graph [--pretty=oneline --abbrev-commit]
```

#### 保留工作现场（切换分支时如果当前分支有未完成任务，不是 `clean` 状态时需要使用，否则非 `clean` 的内容会被带到切换的分支）
```
$ git stash
```

#### 查看工作现场
```
$ git stash list
```

#### 恢复工作现场 方式 1
```
$ git stash apply (仅恢复，不删除 `stash` 里的内容)
$ git stash apply stash@{0} (恢复指定的 `stash` )
$ git stash drop stash@{0} (删除指定的 `stash` )
```

#### 恢复工作现场 方式 2
```
$ git stash pop (恢复的同时删除 `stash` 里的内容，只有一条时使用，避免错乱)
```

#### 删除所有的 stash
```
$ git stash clear
```

#### 查看指定 stash 的内容
```
$ git stash show stash@{0}
```

## 多人协作

#### 查看远程库信息
```
$ git remote [-v: 显示更详细信息]
```

#### 克隆远程库后，默认只能查看 `master` 分支，若需要切换到其它分支
```
$ git checkout -b branch-name <origin>/<branch-name>
```

## 向远程库推送发生冲突时

#### 将远程库最新的提交拉取到本地
```
$ git pull
```

#### 若 `pull` 失败，设置本地分支与远程库分支的链接，再 `pull`
```
$ git branch --set-upstream branch-name <origin>/<branch-name>
```

## 标签管理

#### 打标签（默认打在最新的 `commit` ）
```
$ git tag <tag-name>
$ git tag <tag-name> [commit-id: 指定版本打标签]
```

#### 带有说明的标签， `-a` 指定标签名， `-m` 指定说明文字
```
$ git tag -a <tag-name> -m "说明文字" commit-id
$ git tag -s <tag-name> -m "说明文字" commit-id (用私钥签名标签)
```

#### 查看标签
```
$ git tag
$ git show <tag-name> (查看标签信息)
```

#### 删除标签
```
$ git tag -d <tag-name>
```

#### 向远程推送标签
```
$ git push origin <tag-name>
$ git push origin --tags (推送全部标签)
```

#### 删除远程标签
先删除本地
```
$ git tag -d v0.9
```
再删除远程
```
$ git push origin :refs/tags/v0.9
```

## GitBash 自定义

#### 控制台显示颜色
```
$ git config --global color.ui true
```

## .gitignore
需要忽略某些文件时，配置 `.gitignore` 文件

#### 被规则忽略的文件需要强制 `add` 时，使用 `-f`
```
$ git add -f xxx.xxx
```

#### 查看 `.gitignore` 里对某文件造成忽略的配置
```
$ git check-ignore -v xxx.xxx
```

## 命令别名

#### 例 1 `git st` 替代 `git status`
```
$ git config --global alias.st status
```

#### 例 2 `get unstage` 替代 `git reset HEAD` （撤销暂存区）
```
$ git config --global alias.unstage 'reset HEAD'
```

#### 例 3 显示最后一次提交
```
$ git config --global alias.last 'log -1'
```

#### 例 4 分支历史并格式化样式
```
$ git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

#### 删除命令别名
- 仓库配置文件：进入 `.git/config` 文件，删除对应的行
- 用户配置文件：用户目录（如 `Administrator` ）下隐藏的 `.gitconfig` 文件

## 搭建 Git 服务器
[参考文档](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137583770360579bc4b458f044ce7afed3df579123eca000)
