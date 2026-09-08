#!/usr/bin/env bash
set -euo pipefail

# Bumps charts/Chart.yaml's `version` and `appVersion` together, commits, and creates the
# matching git tag locally. Does NOT push anything — CI only builds on a pushed `vX.Y.Z` tag,
# so pushing is left as a deliberate, separate step you run yourself once you're ready to
# actually trigger a release build.
#
# Usage: scripts/release.sh 1.10.12

if [[ $# -ne 1 ]]; then
    echo "Usage: $0 <version>  (e.g. $0 1.10.12)" >&2
    exit 1
fi

version="$1"
tag="v${version}"

if [[ ! "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Error: version must look like X.Y.Z (got '$version')" >&2
    exit 1
fi

repo_root="$(git rev-parse --show-toplevel)"
chart_file="$repo_root/charts/Chart.yaml"

if [[ -n "$(git status --porcelain)" ]]; then
    echo "Error: working tree is not clean. Commit or stash pending changes before releasing." >&2
    exit 1
fi

if git rev-parse "$tag" >/dev/null 2>&1; then
    echo "Error: tag $tag already exists." >&2
    exit 1
fi

sed -i.bak -E \
    -e "s/^version: .*/version: ${version}/" \
    -e "s/^appVersion: .*/appVersion: \"${tag}\"/" \
    "$chart_file"
rm -f "${chart_file}.bak"

git add "$chart_file"
git commit -m "release: ${tag}"
git tag "$tag"

branch="$(git rev-parse --abbrev-ref HEAD)"
echo
echo "Done locally. Chart.yaml now has version: ${version} / appVersion: \"${tag}\"."
echo "Nothing has been pushed yet. To actually trigger the release build, run:"
echo
echo "    git push origin ${branch}"
echo "    git push origin ${tag}"
