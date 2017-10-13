from __future__ import print_function,unicode_literals
from bs4 import BeautifulSoup as BS
import youtube_dl
import time
import argparse
import logging
import json
import praw
import pychromecast
import re
import urllib2
from urllib2 import Request, urlopen, URLError,urlopen


def main():
    parser = argparse.ArgumentParser(description='Welcome to Jacurutu. The Spice must flow.')
    parser.add_argument("command", help="enter command here")
    parser.add_argument("search_string")
    parser.add_argument("-e", "--episode", help='Pick an episode', type=int)
    parser.add_argument("-s", "--season", help='Pick a season', type=int)
    parser.add_argument("-ip",help='IP Address of Chromecast', type=str)
    parser.add_argument("-url",help="URL of embedded video", type=str)

    args = parser.parse_args()
    if args.command == "search":
        if args.episode:
            print(find_episode(args.search_string, args.season, args.episode))
    if args.command == "casturl":
        print(args.search_string)
        Cast_Video_link(args.search_string)
    if args.command == "redditstream":
        get_reddit_instance(args.search_string)
    if args.command == "localcast":
        local_cast(args.search_string)
    elif args.command == "prime":
        cast_links(find_episode(args.search_string, args.season, args.episode))
        #p = re.compile(r'.*UID(\d+)')
        #with open('./links.txt') as infile:
        #    for line in infile:
        #        if count == 0:
        #            chromecast(line)
        #            count == 1
        #        response = raw_input("Try next link?  (type 'yes')")
        #        if response == "yes":
        #            chromecast(line)
        #        else:
        #            quit()

def cast_links(links):
    url = re.findall('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', links)
   #print(url)
    for x in url:
        line_string=str(x)
        url_string = line_string.splitlines()
        for line in url_string:
            print("Trying " + line)
            try:
                Check_URL(line)
            except:
                pass
    #p = re.compile(r'.*UID(\d+)')
    #unsupported = 'playedto.me'
    #with open('./links.txt') as infile:
    #     for line in infile:
    #         if "http://vodlocker.com" in line:
    #             if count == 0:
    #                 chromecast(line)
    #                 count == 1
    #             response = raw_input("Try next link? (type 'yes')" )
    #             if response =="yes":
    #                 chromecast(line)
    #             else:
    #                 quit()
def retrieve_mp4(url):
    options = {
            'format': 'bestvideo/best',
            'videoformat' : "mp4",
    }

    ydl = youtube_dl.YoutubeDL({'outtmpl': '%(id)s%(ext)s'})

    with ydl:
        result = ydl.extract_info(url, download=False)
        #print(result)
        if 'entries' in result:
            # Can be a playlist or a list of videos
            video = result['entries'][0]
        if 'vidzi.tv' in url:
            print("Trying Vidzi.")
            video_url=result['formats'][0]['url']
            print("Stream Link: "+video_url)
            Cast_Video_link(video_url)
        else:
            # Just a video
            quit()
            video = result
            if video == "":
                quit()
            video_url = video['url']
            print("Stream Link: "+video_url)
            Cast_Video_link(video_url)

        
def Cast_Video_link(video_url):
    cast_list = pychromecast.get_chromecasts()
    print(cast_list)
    print("Select a chromecast:")
    for chromecast in cast_list:
        response = raw_input("%s? (type 'yes') " % str(chromecast))
        if response == "yes":
            print(chromecast.status)
            mc = chromecast.media_controller
            mc.play_media(video_url, 'video/mp4')
            mc.block_until_active()
            print(mc.status)
            #mc.play_media('https://srv01.vidzi.tv/e5uqjg3q342qedz7nkyb5ejwakmo3k2pqcxmddamnfv23hzcdxz6mopsabnq/v.mp4', 'video/mp4')
            break
        else:
            quit()


def local_cast(video_location):
    cast_list = pychromecast.get_chromecasts()
    print(cast_list)
    print("Select a chromecast:")
    for chromecast in cast_list:
        response = raw_input("%s? (type 'yes') " % str(chromecast))
        if response == "yes":
            cast_name = str(chromecast)
            #cast = pychromecast.get_chromecast(friendly_name=cast_name)
            chromecast.wait()
            # print(cast.device)
            # print(cast.status)
            mc = chromecast.media_controller
            mc.play_media(video_location, 'video/mp4')
            print(mc.status)
            #mc.play_media(/home/cmurray/Downloads/The.Shining.1980.US.1080p.BluRay.H264.AAC-RARBG/The.Shining.1980.US.1080p.BluRay.H264.AAC-RARBG.mp4, 'video/mp4')
            break
        else:
            quit()

def find_episode(show, ssn, epi):
    from primewire.primewire import search
    return search(show,year=None,season=ssn,episode=epi)

def get_reddit_instance(sub):
    my_user_agent = "my user agent"
    my_client_id = "q3941h84H3Sytg"
    my_client_secret = "LF6xUjrTOI7NZGdfG-Fh2L--8-A"
    my_username = ""
    my_password = ""
    reddit = praw.Reddit(user_agent=my_user_agent,
                         client_id=my_client_id,
                         client_secret=my_client_secret,
                         username=my_username,
                         password=my_password)
    count = 0
    response = raw_input("What team are you looking for?")
    quality = raw_input("Quality?")
    for submission in reddit.subreddit(sub).hot(limit=30):
        if response in submission.title:
            submission.comments.replace_more(limit=0)
            for top_level_comment in submission.comments:
                if quality == "":
                    if "HQ" in top_level_comment.body:
                        print("Trying HQ...")
                    if "HD" in top_level_comment.body:
                        print("Trying HD...")
                    if "SD" in top_level_comment.body:
                        print("Trying SD...")
                    if "Mobile" in top_level_comment.body:
                        print("Trying Mobile...")
                    if "720p" in top_level_comment.body:
                        split_url = re.findall(r'\((.*?)\)', top_level_comment.body)
                    else:
                        print("Quality Unknown. Trying...")
                    url = re.findall('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', top_level_comment.body)
                    if "720p" not in top_level_comment.body:
                        Cast_Other(url)
                    if "720p" in top_level_comment.body:
                        Cast_720p(split_url)
                elif quality in top_level_comment.body:
                    if quality == "720p":
                        split_url = re.findall(r'\((.*?)\)', top_level_comment.body)
                        Cast_720p(split_url)
                    else:
                        print("Trying " + quality + "...")
                        url = re.findall('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', top_level_comment.body)
                        Cast_Other(url)

def Cast_720p(split_url):
    print("Trying 720p...")
    string_url = str(split_url)
    url = re.findall('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', string_url)

def Cast_720p(split_url):
    print("Trying 720p...")
    string_url = str(split_url)
    url = re.findall('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', string_url)
    for x in url:
        y = str(x)
        s = str.replace(y,"',","")
        z = str(s)
        q = str.replace(z,"']","")
        g = str(q)
        cast_url = g.splitlines()
        for line in cast_url:
            try:
                retrieve_mp4(line)
            except:
                pass

def Cast_Other(url):
    for x in url:
        y = str(x)
        s = str.replace(y,"/)","")
        z = str(s)
        q = str.replace(z,")","")
        print("Other -"+q)
        try:
            retrieve_mp4(q)
        except:
            pass

def Check_URL(url):
    if 'paypal' in url:
        Unsupported_URL(url)
    if 'twitter' in url:
        Unsupported_URL(url)
    if 'vidtodo' in url:
        Unsupported_URL(url)
    if 'thevideo.me' in url:
        Unsupported_URL(url)
    if 'estream.to' in url:
        Unsupported_URL(url)
    if 'watchers.to' in url:
        Unsupported_URL(url)
    if 'vidlox.to' in url:
        Unsupported_URL(url)
    if 'streamplay.to' in url:
        Unsupported_URL(url)
    if 'movdivx.com' in url:
        Unsupported_URL(url)
    if 'novamov' in url:
        Novamov(url)
    if 'vidto.me' in url:
        Unsupported_URL(url)
    if 'streamango' in url:
        Unsupported_URL(url)
    if 'thevideobee.to' in url:
        Youtube_DL_Error(url)
    if 'streamcloud' in url:
        Youtube_DL_Error(url)
    if 'sharesix.com' in url:
        Unsupported_URL(url)
    if 'videoweed' in url:
        Youtube_DL_Error(url)
    if 'streamin.to' in url:
        Youtube_DL_Error(url)
    if 'speedvid' in url:
        Youtube_DL_Error(url)
    if 'vidlox' in url:
        Unsupported_URL(url)
    if 'nowvideo.eu' in url:
        Youtube_DL_Error(url)
    if 'vshare.eu' in url:
        Unsupported_URL(url)
    if 'cloudtime.to' in url:
        Youtube_DL_Error(url)
    if 'vidup.me' in url:
        Unsupported_URL(url)
    if 'vidspot.net' in url:
        Youtube_DL_Error(url)
    if 'allmyvideos.net' in url:
        Youtube_DL_Error(url)
    if 'filenuke.com' in url:
        Unsupported_URL(url)
    if 'nosvideo.com' in url:
        Youtube_DL_Error(url)
    else: 
        retrieve_mp4(url)

def Unsupported_URL(url):
    #print("This link is not currently supported by Jacarutu.")
    quit()

def Novamov(url):
    #print("Novamov is currently experiencing issues.")
    quit()

def Youtube_DL_Error(url):
    #print("This site is not currently supported. Obtain Error log and submit to Youtube_DL")
    quit()

if __name__ == "__main__":
    main()
