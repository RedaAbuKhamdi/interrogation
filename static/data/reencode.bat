for %%i in (*.json) do iconv -t utf-8 "%%i"> utf8/%%i
timeout 3