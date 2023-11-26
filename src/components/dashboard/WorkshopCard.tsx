import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface MediumPost {
  guid: string;
  title: string;
  pubDate: string;
  description: string;
  link: string;
  author: string;
  thumbnail: string;
}

export default function WorkshopCard() {
  const [mediumPosts, setMediumPosts] = useState<MediumPost[]>([]);

  useEffect(() => {
    const mediumFeedEndpoint = 'https://api.rss2json.com/v1/api.json?rss_url=https://billionlocalcoin.medium.com/feed';

    axios.get(mediumFeedEndpoint)
      .then((response) => {
        setMediumPosts(response.data.items);
      })
      .catch((error) => {
        console.error('Error fetching Medium blog data:', error);
      });
  }, []);

  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 pt-10 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {mediumPosts.map((post) => (
            <article key={post.guid} className="flex card max-w-xl flex-col items-start justify-between rounded-[12px] border-[2px] border-portal bg-clip-border shadow-md shadow-[#27ff0059] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none !p-[14px] mt-4 mb-4">
              <div className="group relative">
                <img src={post.thumbnail} className='mt-2 rounded-xl'/>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover-text-gray-600">
                  <a href={post.link} target="_blank">
                    <span className="absolute inset-0" />
                    <div dangerouslySetInnerHTML={{ __html: post.title }} />
                  </a>
                </h3>
                <time dateTime={post.pubDate} className="text-p">
                  {new Date(post.pubDate).toDateString()}
                </time>
                <p className="mt-3 mb-3 line-clamp-3 text-sm leading-6 text-gray-600">
                  <a href={post.link} className="text-blue-500 smart-btn"> Read Full Post</a>
                </p>
              </div>
              <div className="relative mt-3 flex items-center gap-x-4">
                <img src={post.thumbnail} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      <span className="absolute inset-0" />
                      {post.author}
                    </a>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
