import time
import argparse
import logging
import json
import pychromecast
from urllib2 import Request, urlopen, URLError

def main():
    parser = argparse.ArgumentParser(description='Welcome to Jacurutu. The Spice must flow.')
    parser.add_argument("command", help="enter command here")
    parser.add_argument("search_string")
    parser.add_argument("-e", "--episode", help='Pick an episode', type=int)
    parser.add_argument("-s", "--season", help='Pick a season', type=int)
    parser.add_argument("-ip",help='IP Address of Chromecast', type=str)

    args = parser.parse_args()
    if args.command == "search":
        if args.episode:
            find_episode(args.search_string, args.season, args.episode)
        else:
            print search(args.search_string)
    elif args.command == "cast":
            cast_links(find_episode(args.search_string, args.season, args.episode))

def cast_links(links):
    link_json = json.loads(links)
    sources = link_json['sources']
    for link in sources:
        if link['name'] == "vodlocker.com":
           url = "http://www." + link['name']+ link['url'] 
	   chromecast(url)

def chromecast(url):
    pychromecast.get_chromecasts_as_dict().keys()
    ['Caladan']
    cast = pychromecast.Chromecast('192.168.1.9')
    cast.wait()
    print(cast.device)
    print(cast.status)
    mc = cast.media_controller
    print url
    mc.play_media(url, 'video/mp4')
    print(mc.status)
    
def search(string):
    request = Request('http://ptvapi.com/api?q=%s' % string)
    response = urlopen(request)
    shows = response.read()
    return shows

def find_episode(show, season, episode):
    request = Request('http://ptvapi.com/api?n=%s&s=%d&e=%d&f' % (show, season, episode))
    response = urlopen(request)
    links = response.read()
    return links

if __name__ == '__main__':
    main()


