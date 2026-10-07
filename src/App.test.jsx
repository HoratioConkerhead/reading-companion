import { render, screen, within, waitFor, act } from '@testing-library/react';
import App from './App';

// Smoke test: the default book loads and each tab renders without crashing.
describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads the default book and renders every tab', async () => {
    const { container } = render(<App />);

    // Book data loads asynchronously (each book is its own chunk)
    const tabList = await screen.findByRole('tablist', {}, { timeout: 5000 });
    const tabs = within(tabList).getAllByRole('tab');
    expect(tabs.length).toBeGreaterThanOrEqual(8);

    // The relationship web is always rendered (forceRender) and draws the focused character's circle
    await waitFor(() => {
      expect(container.querySelectorAll('.relationship-web [data-node-id]').length).toBeGreaterThan(0);
    });

    for (const tab of tabs) {
      await act(async () => { tab.click(); });
      expect(tab).toHaveAttribute('aria-selected', 'true');
      const panel = container.querySelector('.react-tabs__tab-panel--selected');
      expect(panel).not.toBeEmptyDOMElement();
    }
  });
});
