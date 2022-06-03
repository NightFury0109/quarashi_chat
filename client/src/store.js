import { writable } from 'svelte/store';

export const localConnectionStore = writable({});
export const remoteConnectionStore = writable({});
export const sendChannelStore = writable({});
export const receiveChannelStore = writable({});