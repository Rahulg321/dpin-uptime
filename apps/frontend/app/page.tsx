import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clock,
  Bell,
  BarChart,
  Shield,
  Globe,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Know when your website is down before your customers do
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    BetterUptime monitors your website, API, and services 24/7
                    and alerts you when something goes wrong.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">Start Monitoring Now</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="#features">See Features</Link>
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  No credit card required. Free plan available.
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Dashboard preview"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Trusted by thousands of companies worldwide
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Join the companies that rely on BetterUptime for their
                  monitoring needs.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8 py-8">
              <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4">
                <div className="text-3xl font-bold">99.9%</div>
                <p className="text-sm text-muted-foreground">
                  Uptime Guarantee
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4">
                <div className="text-3xl font-bold">5,000+</div>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4">
                <div className="text-3xl font-bold">10s</div>
                <p className="text-sm text-muted-foreground">
                  Avg. Response Time
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4">
                <div className="text-3xl font-bold">24/7</div>
                <p className="text-sm text-muted-foreground">
                  Monitoring & Support
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything you need to stay online
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Our platform provides comprehensive monitoring and alerting to
                  ensure your services are always available.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Features illustration"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="mt-1 h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold">Website Monitoring</h3>
                      <p className="text-muted-foreground">
                        Monitor your websites from multiple locations around the
                        world with 10-second intervals.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Bell className="mt-1 h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold">Instant Alerts</h3>
                      <p className="text-muted-foreground">
                        Get notified via SMS, email, Slack, Discord, and more
                        when your services go down.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <BarChart className="mt-1 h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold">Detailed Analytics</h3>
                      <p className="text-muted-foreground">
                        Track your uptime, response times, and performance with
                        detailed reports and dashboards.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Shield className="mt-1 h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold">
                        SSL Certificate Monitoring
                      </h3>
                      <p className="text-muted-foreground">
                        Get alerted before your SSL certificates expire to avoid
                        security warnings.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* More Features */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li className="flex items-start gap-4">
                    <Globe className="mt-1 h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold">Global Monitoring</h3>
                      <p className="text-muted-foreground">
                        Monitor from multiple regions worldwide to ensure your
                        service is available everywhere.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Clock className="mt-1 h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold">
                        Scheduled Maintenance
                      </h3>
                      <p className="text-muted-foreground">
                        Schedule maintenance windows to avoid false alerts
                        during planned downtime.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="mt-1 h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold">Status Pages</h3>
                      <p className="text-muted-foreground">
                        Create beautiful, customizable status pages to keep your
                        users informed.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Bell className="mt-1 h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold">On-Call Scheduling</h3>
                      <p className="text-muted-foreground">
                        Set up on-call rotations to ensure the right person is
                        alerted at the right time.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="More features illustration"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-first"
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Simple, transparent pricing
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Choose the plan that's right for you and start monitoring your
                  services today.
                </p>
              </div>
            </div>
            <div className="grid max-w-5xl mx-auto gap-6 py-12 lg:grid-cols-3">
              {/* Free Plan */}
              <div className="flex flex-col p-6 bg-background shadow-sm rounded-lg border">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <p className="text-muted-foreground">
                    Perfect for personal projects and small websites.
                  </p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>1 monitor</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>5-minute check intervals</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Email alerts</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Basic status page</span>
                  </li>
                </ul>
                <Button className="mt-8" variant="outline" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>

              {/* Pro Plan */}
              <div className="flex flex-col p-6 bg-primary text-primary-foreground shadow-lg rounded-lg relative">
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Most Popular
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <p className="text-primary-foreground/90">
                    For growing businesses and teams.
                  </p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="ml-1 text-primary-foreground/90">
                    /month
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    <span>10 monitors</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    <span>1-minute check intervals</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    <span>SMS, email, Slack alerts</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    <span>Custom status page</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    <span>SSL monitoring</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    <span>5 team members</span>
                  </li>
                </ul>
                <Button
                  className="mt-8 bg-background text-primary hover:bg-background/90"
                  asChild
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>

              {/* Enterprise Plan */}
              <div className="flex flex-col p-6 bg-background shadow-sm rounded-lg border">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="text-muted-foreground">
                    For large organizations with advanced needs.
                  </p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Unlimited monitors</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>10-second check intervals</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>All alert channels</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>White-label status page</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Unlimited team members</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="mt-8" variant="outline" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What our customers say
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Don't just take our word for it. Here's what our customers
                  have to say about BetterUptime.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              {/* Testimonial 1 */}
              <div className="flex flex-col p-6 bg-background shadow-sm rounded-lg border">
                <div className="flex items-start gap-4">
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    width={60}
                    height={60}
                    alt="Customer avatar"
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-bold">Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground">
                      CTO, TechStart Inc.
                    </p>
                  </div>
                </div>
                <blockquote className="mt-4 text-muted-foreground">
                  "BetterUptime has been a game-changer for our team. We used to
                  miss critical outages, but now we're the first to know when
                  something goes wrong. The status page feature has also reduced
                  our support tickets by 30%."
                </blockquote>
              </div>

              {/* Testimonial 2 */}
              <div className="flex flex-col p-6 bg-background shadow-sm rounded-lg border">
                <div className="flex items-start gap-4">
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    width={60}
                    height={60}
                    alt="Customer avatar"
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-bold">Michael Chen</h3>
                    <p className="text-sm text-muted-foreground">
                      DevOps Lead, CloudScale
                    </p>
                  </div>
                </div>
                <blockquote className="mt-4 text-muted-foreground">
                  "The on-call scheduling and escalation policies have
                  transformed how we handle incidents. Our response times have
                  improved dramatically, and the team is much less stressed
                  knowing the right person will be alerted."
                </blockquote>
              </div>

              {/* Testimonial 3 */}
              <div className="flex flex-col p-6 bg-background shadow-sm rounded-lg border">
                <div className="flex items-start gap-4">
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    width={60}
                    height={60}
                    alt="Customer avatar"
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-bold">Emily Rodriguez</h3>
                    <p className="text-sm text-muted-foreground">
                      Founder, ShopifyPlus
                    </p>
                  </div>
                </div>
                <blockquote className="mt-4 text-muted-foreground">
                  "As an e-commerce business, downtime means lost revenue.
                  BetterUptime has helped us identify and fix issues before they
                  impact our customers. The ROI has been incredible."
                </blockquote>
              </div>

              {/* Testimonial 4 */}
              <div className="flex flex-col p-6 bg-background shadow-sm rounded-lg border">
                <div className="flex items-start gap-4">
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    width={60}
                    height={60}
                    alt="Customer avatar"
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-bold">David Kim</h3>
                    <p className="text-sm text-muted-foreground">
                      SRE Manager, DataFlow
                    </p>
                  </div>
                </div>
                <blockquote className="mt-4 text-muted-foreground">
                  "The detailed analytics and reporting have given us insights
                  we never had before. We've been able to optimize our
                  infrastructure and improve our overall uptime from 99.5% to
                  99.99%."
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Frequently asked questions
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Got questions? We've got answers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  How does BetterUptime monitor my website?
                </h3>
                <p className="text-muted-foreground">
                  BetterUptime sends HTTP requests to your website from multiple
                  locations around the world at regular intervals. If we detect
                  that your website is down, we'll send you an alert.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  What alert channels do you support?
                </h3>
                <p className="text-muted-foreground">
                  We support email, SMS, phone calls, Slack, Discord, Microsoft
                  Teams, PagerDuty, OpsGenie, and webhook notifications.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  Can I monitor APIs and backend services?
                </h3>
                <p className="text-muted-foreground">
                  Yes, you can monitor any HTTP endpoint, including APIs. You
                  can also set up custom checks for specific response codes,
                  response times, and content validation.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  Do you offer a free trial?
                </h3>
                <p className="text-muted-foreground">
                  Yes, we offer a 14-day free trial of our Pro plan with no
                  credit card required. You can also use our Free plan
                  indefinitely.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">How do status pages work?</h3>
                <p className="text-muted-foreground">
                  Status pages automatically reflect the status of your
                  monitored services. You can customize them with your branding,
                  add components, and communicate incidents to your users.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  Can I monitor from specific regions?
                </h3>
                <p className="text-muted-foreground">
                  Yes, you can select specific regions for monitoring to ensure
                  your service is available to users in those areas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to never miss downtime again?
                </h2>
                <p className="max-w-[700px] text-primary-foreground/90 md:text-xl/relaxed">
                  Join thousands of companies that trust BetterUptime to monitor
                  their services.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-background text-primary hover:bg-background/90"
                  asChild
                >
                  <Link href="/signup">Start Your Free Trial</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
              <p className="text-sm text-primary-foreground/90">
                No credit card required. 14-day free trial.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:flex-row lg:gap-12">
          <div className="flex flex-col gap-4 lg:w-1/3">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">BetterUptime</span>
            </div>
            <p className="text-sm text-muted-foreground">
              BetterUptime monitors your website, API, and services 24/7 and
              alerts you when something goes wrong.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Status Page
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    On-Call
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    API
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    SLA
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 px-4 md:px-6 lg:flex-row">
            <p className="text-center text-sm text-muted-foreground lg:text-left">
              &copy; {new Date().getFullYear()} BetterUptime. All rights
              reserved.
            </p>
            <p className="text-center text-sm text-muted-foreground lg:text-left">
              Made with <span className="text-primary">♥</span> for the web
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
