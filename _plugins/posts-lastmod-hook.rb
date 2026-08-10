#!/usr/bin/env ruby
#
# Check for changed posts

require 'shellwords'

# Resolving last-modified dates costs two `git` invocations per post, which
# dominates build time. The date is only consumed by the published site, so
# skip the hook entirely outside production.
#
# NOTE: guard the registration rather than returning from inside the block --
# `return` in a hook block raises LocalJumpError. `next` would also work, but
# this way we avoid the per-post call altogether.
if ENV['JEKYLL_ENV'] == 'production'

  Jekyll::Hooks.register :posts, :post_init do |post|

    path = Shellwords.escape(post.path)

    commit_num = `git rev-list --count HEAD -- #{ path }`

    if commit_num.to_i > 1
      lastmod_date = `git log -1 --pretty="%ad" --date=iso -- #{ path }`
      post.data['last_modified_at'] = lastmod_date
    end

  end

end
