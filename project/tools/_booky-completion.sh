# booky tab completion

_booky_completions()
{
  local cur prev opts

  COMPREPLY=()
  cur="${COMP_WORDS[COMP_CWORD]}"
  prev="${COMP_WORDS[COMP_CWORD-1]}"

  opts="--help \
        --webpify \
        --jpegify \
        --resize \
        --song \
        --render-pdf \
        --render-pdf-all \
        --render-pdf-themes"

  # First argument completion
  if [ $COMP_CWORD -eq 1 ]; then
    COMPREPLY=( $(compgen -W "${opts}" -- ${cur}) )
    return 0
  fi
}

complete -F _booky_completions booky.sh
