import { PostsTimeAgoPipe } from './posts-time-pipe/posts-time-ago.pipe';

describe('PostsTimeAgoPipe', () => {
  it('create an instance', () => {
    const pipe = new PostsTimeAgoPipe();
    expect(pipe).toBeTruthy();
  });
});
