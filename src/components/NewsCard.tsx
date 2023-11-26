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

export default function NewsCard() {
  const [mediumPosts, setMediumPosts] = useState<MediumPost[]>([]);

  useEffect(() => {
    const mediumFeedEndpoint = 'https://api.rss2json.com/v1/api.json?rss_url=https://trcnews.medium.com/feed';

    axios.get(mediumFeedEndpoint)
      .then((response) => {
        setMediumPosts(response.data.items);
      })
      .catch((error) => {
        console.error('Error fetching Medium blog data:', error);
      });
  }, []);

  return (
    <div className="bg-features-1 py-12 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="mb-2 lg:text-5xl text-4xl font-bold tracking-tight headerColor sm:text-4xl">TRC News & Updates</h2>
            <p className="mt-2 text-lg leading-8 text-heading">
            Get Latest News & Updates about TRC  
            </p>
          </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {mediumPosts.map((post) => (
            <article key={post.guid} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.pubDate} className="text-p">
                  {new Date(post.pubDate).toDateString()}
                </time>
                <a
                  href={post.link}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover-bg-gray-100"
                >
                  Medium
                </a>
              </div>
              <div className="group relative">
                <img src={post.thumbnail} className='mt-2 rounded-xl'/>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover-text-gray-600">
                  <a href={post.link}>
                    <span className="absolute inset-0" />
                    <div dangerouslySetInnerHTML={{ __html: post.title }} />
                  </a>
                </h3>
                {/* <p dangerouslySetInnerHTML={{ __html: post.description }} /> */}
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                  <a href={post.link} className="text-blue-500"> Read Full Post</a>
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
