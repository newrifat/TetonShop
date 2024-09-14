import { test as base } from '@playwright/test';
import { LoginPage } from '../pom/loginpage';
import { DashboardPage } from '../pom/dashboardpage';

type WPFixture = {
    toLoginPage: LoginPage;
    toDashboardPage: DashboardPage;
}

export const WPTest = base.extend<WPFixture>({
    toLoginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    toDashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    }
});

export { expect } from '@playwright/test';