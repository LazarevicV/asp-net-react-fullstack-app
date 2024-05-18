using asp_net_react_fullstack_app.Server.Models;
using Humanizer;
using Microsoft.VisualBasic;
using MongoDB.Driver;
using System.Composition;
using static System.Net.WebRequestMethods;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace asp_net_react_fullstack_app.Server.Migrations
{
    public class CourseSeeder
    {
        private readonly IMongoCollection<Course> _courseCollection;

        public CourseSeeder(IMongoDatabase database)
        {
            _courseCollection = database.GetCollection<Course>("Courses");
        }

        public async Task MigrateData()
        {
            Console.WriteLine("Starting course data seeding...");
            try
            {
                var courses = new List<Course>
                {
                    new() {
                        Title = "Intro to computer science - Python",
                        Category = "Computer science",
                        Description = "Discover the fundamentals of Python programming through our engaging course on Google Classroom. Dive into variables, conditionals, loops, and functions while applying your skills to real-world projects like recommendation engines and game design. With a focus on problem-solving and practical application, you'll learn by practicing reading, modifying, and creating code. Get ready to embark on a journey of programming exploration with Exercises, Challenges, and Projects tailored to enhance your Python proficiency. Stay tuned for more instructional materials and exciting updates!",
                        Link = "https://www.khanacademy.org/computing/intro-to-python-fundamentals",
                        School = "Khan Academy"
                    },
                    new() {
                        Title = "HTML, CSS, and Javascript for Web Developers",
                        Category = "Computer science",
                        Description = "This course equips you with essential skills to create modern, responsive web pages. Starting with HTML and CSS, you'll learn to design pages that adapt seamlessly across devices. Then, delve into JavaScript to build dynamic web applications, integrating server-side functionality through Ajax for a rich user experience.",
                        Link = "https://www.coursera.org/learn/html-css-javascript-for-web-developers",
                        School = "Coursera"
                    },
                    new() {
                        Title = "Introducing ICT systems",
                        Category = "Computer science",
                        Description = "This free course introduces you to the world of Information and Communication Technologies (ICTs), exploring their components, functions, and applications in our daily lives. You'll gain a comprehensive understanding of ICT systems, including their processes, hardware, software, and communication components. By the end, you'll be equipped to recognize and utilize various elements within ICT systems, employing proper data conveying and storage techniques.",
                        Link = "https://www.open.edu/openlearn/digital-computing/introducing-ict-systems/",
                        School = "The Open University"
                    },
                    new() {
                        Title = "CS107: C++ Programming",
                        Category = "Computer science",
                        Description = "In this course, you'll dive into the mechanics of C++ programming, starting with fundamental concepts like variables, loops, functions, and strings. Progressing to object-oriented programming, you'll explore classes, inheritance, templates, and file handling. Delve deeper into advanced topics including namespaces, exception handling, and preprocessor directives, while mastering sophisticated techniques for data structures like linked lists and binary trees. By the end, you'll have a comprehensive understanding of C++ and be equipped with the skills to tackle complex programming challenges confidently.",
                        Link = "https://learn.saylor.org/course/view.php?id=65",
                        School = "Saylor"
                    },
                    new() {
                        Title = "Introduction to Kubernetes",
                        Category = "Computer science",
                        Description = "Kubernetes is an open-source platform for automating containerized application deployment, scaling and management. It consists of several components that communicate with one another via the API server to package applications in a standardized manner. This course will teach you the fundamentals of Kubernetes, which will help you get started in your professional DevOps career. Discover microservices, deployments, Kubectl and Minikube.",
                        Link = "https://alison.com/course/introduction-to-kubernetes",
                        School = "Alison"
                    },
                    new() {
                        Title = "Macroeconomics",
                        Category = "Economy",
                        Description = "Explore the intricate workings of national economies in our Macroeconomics course. Delve into key economic principles such as GDP, inflation, unemployment, fiscal and monetary policy, and international trade. Gain a comprehensive understanding of how these factors influence economic performance and policy decisions on a national and global scale. Whether you're a student, professional, or simply curious about the forces driving economies, this course offers invaluable insights into the macroeconomic landscape.",
                        Link = "https://www.khanacademy.org/economics-finance-domain/macroeconomics",
                        School = "Khan Academy"
                    },
                    new() {
                        Title = "Get ready for Algebra 1",
                        Category = "Mathematics",
                        Description = "Prepare for success in Algebra 1 with our comprehensive course. Covering essential mathematical concepts and skills, you'll build a solid foundation for advanced algebraic thinking. From mastering basic operations and equations to understanding functions and graphing, this course equips you with the tools and confidence to excel in algebraic problem-solving. Whether you're a student gearing up for high school math or an adult revisiting algebraic fundamentals, this course ensures you're ready to tackle Algebra 1 with ease.",
                        Link = "https://www.khanacademy.org/math/get-ready-for-algebra-i",
                        School = "Khan Academy"
                    },
                    new() {
                        Title = "Contemporary issues in managing",
                        Category = "Economy",
                        Description = "This free online course, Contemporary issues in managing, introduces three contemporary approaches (managing through organisational culture, managing through internal marketing, and managing through collective leadership). These approaches require you to think critically and challenge ideas and received wisdom. \r\n\r\nTraditionally, managing was born out of what Knights and Willmott (2012) call ‘direct control’ (Taylorism), where ‘foremen’ and supervisors were employed to watch staff at all times. In contemporary times, both coercion and direct supervision are still both used, but less often because other methods are also available. These different techniques are seductive because they entice employees to overwork by insinuating that being part of the organisation is like belonging to ‘a family’ where commitment is high, and identity becomes hugely dependant on ‘loving their job’.",
                        Link = "https://www.open.edu/openlearn/money-business/contemporary-issues-managing/",
                        School = "Khan Academy"
                    },
                    new() {
                        Title = "Introduction to Corporate Finance",
                        Category = "Economy",
                        Description = "Embark on a journey into the world of corporate finance with our Introduction to Corporate Finance course. Dive deep into essential financial principles, equipping yourself with the skills to evaluate and value investment opportunities effectively. From understanding the intricacies of stock and bond valuation to grasping key financial concepts, this course provides a solid foundation for navigating the complex landscape of corporate finance. Whether you're a budding investor, finance professional, or simply eager to expand your financial knowledge, this course is your gateway to mastering the fundamentals of corporate finance.",
                        Link = "https://www.edx.org/learn/corporate-finance/columbia-university-introduction-to-corporate-finance",
                        School = "EDX"
                    },
                    new() {
                        Title = "ECON102: Principles of Macroeconomics\r\n",
                        Category = "Economy",
                        Description = "Economists divide their discipline into two areas of study: microeconomics and macroeconomics. In this course, we introduce the principles of macroeconomics: the study of how a country's economy works as we try to discern among good, better, and best choices for improving and maintaining the nation's standard of living and level of economic and societal well-being. Historical and contemporary perspectives on the role of government policy surround questions of who gains and loses within a small set of key interdependent players. These beneficiaries include households, consumers, savers, firm owners, investors, government officials, and global trading partners.\r\nMicroeconomics studies how supply and demand determine prices in a given market. In macroeconomics, we examine changes in the price level across all markets. The main goals of the macroeconomy are to achieve economic growth, price stability, and full employment. Macroeconomic performance relies on measures of economic activity, such as variables and data at the national level, within a specific period. Macroeconomics analyzes aggregate measures, such as national income, national output, unemployment and inflation rates, and business cycle fluctuations. In this course, we prompt you to consider national and global issues and various competing perspectives, tools, and alternatives.",
                        Link = "https://learn.saylor.org/course/view.php?id=865",
                        School = "Saylor"
                    },
                    new() {
                        Title = "Understanding the Inner Workings of the Economy",
                        Category = "Economy",
                        Description = "Do you want to know how economies function and affect our daily lives? This basic economics course explores subjects like economic cycles, market structures, fiscal policies, supply and demand, monetary policies and more. We present thoughtful discussions and practical exercises to help you understand your place in the global economy and make smart financial decisions. Sign up to explore the fascinating world of finance and learn how money works.",
                        Link = "https://alison.com/course/understanding-the-inner-workings-of-the-economy",
                        School = "Alison"
                    },
                };
                Console.WriteLine("Course data seeding completed successfully.");

                await _courseCollection.InsertManyAsync(courses);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while seeding school data: {ex.Message}");
            }
        }
    }
}
