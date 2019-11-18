#!/bin/bash

### Credit: https://github.com/ekg/foxsamply

# A POSIX variable
OPTIND=1         # Reset in case getopts has been used previously in the shell.

# Initialize our own variables:
input_file=""
record_time=""
output_file=""
record_delay=1

function show_help {
    echo "foxsamply code to audio algorenderer"
    echo "usage: $0 -f [code.foxdot] -s [record seconds] -o [output basename] -d [delay seconds]"
}

while getopts "h?f:s:o:d:" opt; do
    case "$opt" in
	h|\?)
	    show_help
	    exit 0
	    ;;
	s)  record_time=$OPTARG
	    ;;
	o)  output_file=$OPTARG
	    ;;
	f)  input_file=$OPTARG
	    ;;
	d)  record_delay=$OPTARG
	    ;;
    esac
done

shift $((OPTIND-1))

if [ -z "$input_file" ] || [ -z "record_time" ] || [ -z "$output_file" ]
then
    show_help
    exit 0
fi

#echo "verbose=$verbose, output_file='$output_file', Leftovers: $@"


killall -KILL jackd
killall -KILL Xvfb
rm -f foxy.sample.pipe
sleep 3
rm -f /tmp/.X99-lock
export DISPLAY=:99
Xvfb :99 -ac -screen 0 1280x1024x16 &
jackd -d dummy &
sleep 3
echo FoxDot.start >/tmp/g && sclang /tmp/g &
sleep 3
#((sleep 5; cat $script| sed 's/\n/\n\n/g' ; echo; echo) | python -m FoxDot -p) &
mkfifo foxy.sample.pipe
cat foxy.sample.pipe | python -m FoxDot -p &
sleep infinity > foxy.sample.pipe & # keep pipe open
(cat $input_file; echo; echo) >>foxy.sample.pipe # write our thing into it
# wait not sec or two
sleep $record_delay
#sleep 0.5
jack_rec -f $output_file.wav -d $record_time SuperCollider:out_1 SuperCollider:out_2
lame -V2 $output_file.wav $output_file.mp3
#sleep 5
killall -KILL jackd
killall -KILL Xvfb
kill $(jobs -p)
rm -f foxy.sample.pipe
