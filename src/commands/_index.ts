import { ping } from './ping';
import { play } from './play';

export const commands = [ping.data.toJSON(), play.data.toJSON()];
