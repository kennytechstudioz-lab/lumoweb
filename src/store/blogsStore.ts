import { create } from 'zustand';
import { api } from '@/util/api';

interface BlogsState {
  blogs: any[];
  loading: boolean;
  fetchBlogs: () => Promise<void>;
}

const DEFAULT_BLOGS = [
  {
    _id: '6aaaa666fb4a4457cd18fbe3',
    category: 'Blog',
    title: 'Next-Gen Cross-Border Payments: How Instant Multi-Currency Settlement Is Changing Global Commerce',
    subtitle: 'Explore how modern multi-currency vaults and real-time ledger rails eliminate FX volatility and reduce cross-border transfer friction.',
    time: 1789568614,
    author: 'Lumo Group Desk',
    banner: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&h=800&q=80',
    content: 'In today\'s interconnected global economy, traditional correspondent banking corridors are no longer sufficient...',
  },
  {
    _id: '6aaaa667fb4a4457cd18fbe4',
    category: 'Blog',
    title: 'Zero-Trust Banking Security: Protecting Your Digital Wealth Against Modern Cyber Threats',
    subtitle: 'A deep dive into multi-factor biometric authorization, hardware security modules, and real-time fraud mitigation in digital banking.',
    time: 1789482214,
    author: 'Lumo Security Bureau',
    banner: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=800&q=80',
    content: 'As digital banking services become the primary gateway for personal and enterprise wealth management...',
  },
  {
    _id: '6aaaa667fb4a4457cd18fbe5',
    category: 'Blog',
    title: 'The Evolution of Virtual Debit Cards: Smart Spending, Instant Issuance, and Global Reach',
    subtitle: 'Discover how virtual card tokenization and dynamic security codes are redefining everyday merchant purchases and travel financing.',
    time: 1789395814,
    author: 'Lumo Wealth Advisory',
    banner: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&h=800&q=80',
    content: 'The physical wallet is rapidly transitioning into history. Today\'s digital banking landscape is spearheaded by virtual debit cards...',
  },
];

export const useBlogsStore = create<BlogsState>((set, get) => ({
  blogs: DEFAULT_BLOGS,
  loading: false,
  fetchBlogs: async () => {
    try {
      const data = await api.get('/admin/blogs');
      if (Array.isArray(data) && data.length > 0) {
        set({ blogs: data, loading: false });
      } else {
        set({ loading: false });
      }
    } catch (e) {
      console.error('Error fetching blogs:', e);
      set({ loading: false });
    }
  },
}));
