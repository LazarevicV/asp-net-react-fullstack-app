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

                    new() {
                        Title = "Health and medicine",
                        Category = "Science",
                        Description = "Dive into the intricate world of the human body with this course! Designed to demystify complex medical terminology and concepts, it aims to make the fascinating field of health and medicine accessible to everyone, from patients and their families to aspiring health professionals.",
                        Link = "https://www.khanacademy.org/science/health-and-medicine",
                        School = "Khan Academy"
                    },

                    new() {
                        Title = "Accessibility and inclusion in digital health",
                        Category = "Psychology",
                        Description = "In this free course, Accessibility and inclusion in digital health, you will consider some of the ways that people can access digital health in the UK and how they are able to take more control over their physical and mental health. This OpenLearn course is an adapted extract from the Open University course K102 Introducing health and social care.",
                        Link = "https://www.open.edu/openlearn/health-sports-psychology/accessibility-and-inclusion-digital-health/content-section-0?active-tab=description-tab",
                        School = "The Open University"
                    },

                    new() {
                        Title = "UCx: Mental Health and Nutrition",
                        Category = "Health",
                        Description = "Learn what foods and nutrients should and should not be consumed to improve mental wellbeing and explore the fundamental role that nutrition plays in our mental health.",
                        Link = "https://www.edx.org/learn/nutrition/university-of-canterbury-mental-health-and-nutrition?index=product&objectID=course-7b36cc3e-d414-4602-95b7-c96e32311456&webview=false&campaign=Mental+Health+and+Nutrition&source=edX&product_category=course&placement_url=https%3A%2F%2Fwww.edx.org%2Flearn%2Fnutrition",
                        School = "EDX"
                    },

                    new() {
                        Title = "Introduction to Molecular and Cellular Biology",
                        Category = "Biology",
                        Description = "This course is designed for students who want to learn about and appreciate basic biological topics while studying the smallest units of biology: molecules and cells. Molecular and cellular biology is a dynamic discipline. There are thousands of opportunities within the medical, pharmaceutical, agricultural, and industrial fields. In addition to preparing you for a diversity of career paths, understanding molecular and cell biology will help you make sound decisions that can benefit your diet and health.",
                        Link = "https://learn.saylor.org/course/view.php?id=349%5C",
                        School = "Saylor"
                    },

                    new() {
                        Title = "Introduction to Public Health",
                        Category = "Health",
                        Description = "This course will explore the history, functions and science of public health. First, we will examine the role of government in public health, including its significant branches such as population and informatics. Next, we will discuss the meaningful epidemiologic functions, the measurement of disease incidence and the study of disease outbreaks. In addition, we will learn about public health ethics and human rights.",
                        Link = "https://alison.com/course/introduction-to-public-health",
                        School = "Alison"
                    },

                    new() {
                        Title = "Introduction to Public Health",
                        Category = "Art",
                        Description = "A brief introduction to art history. We understand the history of humanity through art. From prehistoric depictions of bison to contemporary abstraction, artists have addressed their time and place in history and expressed universal truths for tens of thousands of years.",
                        Link = "https://www.khanacademy.org/humanities/art-history",
                        School = "Khan Academy"
                    },

                    new() {
                        Title = "Art in Renaissance Venice",
                        Category = "Art",
                        Description = "Art in Renaissance VeniceCreative commons Icon\nCourse description\nCourse content\nCourse reviews\nThis free course, Art in Renaissance Venice, considers the art of Renaissance Venice and how such art was determined in many ways by the city's geographical location and ethnically diverse population. Studying Venice and its art offers a challenge to the conventional notion of Renaissance art as an entirely Italian phenomenon.",
                        Link = "https://www.open.edu/openlearn/history-the-arts/visual-art/art-renaissance-venice/content-section-0?active-tab=description-tab",
                        School = "The Open University"
                    },

                    new() {
                        Title = "LCIEducation: Introduction to Illustrator",
                        Category = "Art",
                        Description = "Create your own logos, icons, diagrams and other visual content according to graphic design industry standards with this introductory course to Adobe Illustrator.",
                        Link = "https://www.edx.org/learn/design/lci-education-introduction-to-illustrator?index=product&objectID=course-e4ef6680-1128-4c26-95a0-56826921a20b&webview=false&campaign=Introduction+to+Illustrator&source=edX&product_category=course&placement_url=https%3A%2F%2Fwww.edx.org%2Flearn%2Fart",
                        School = "EDX"
                    },

                    new() {
                        Title = "ARTH101: Art Appreciation",
                        Category = "Art",
                        Description = "This course explores visual art forms and their cultural connections across historical periods, designed for students with little experience in the visual arts. It includes brief studies in art history and in-depth inquiry into the elements, media, and methods used in a range of creative processes. At the beginning of this course, we will study a five-step system for developing an understanding of visual art in all forms. After completing this course, you will be able to interpret works of art based on this five-step system, explain the processes involved in artistic production, identify the many kinds of issues that artists examine in their work, and explain the role and effect of the visual arts in different social, historical and cultural contexts.",
                        Link = "https://learn.saylor.org/course/view.php?id=701",
                        School = "Saylor"
                    },

                    new() {
                        Title = "Introduction to Art Therapy\n",
                        Category = "Art",
                        Description = "Art therapy is a type of psychotherapy that uses art as a form of communication between the therapist and the patient to treat a wide range of mental health conditions. In this psychotherapy course, we explore the concepts and practices of art therapy to help you engage in therapeutic art activities with your clients. We provide the skills you need to confidently work with clients of all artistic abilities in a variety of settings.",
                        Link = "https://alison.com/course/introduction-to-art-therapy",
                        School = "Alison"
                    },

                    new() {
                        Title = "Introduction to Mathematical Thinking",
                        Category = "Mathematics",
                        Description = "Learn how to think the way mathematicians do – a powerful cognitive process developed over thousands of years.Mathematical thinking is not the same as doing mathematics – at least not as mathematics is typically presented in our school system. School math typically focuses on learning procedures to solve highly stereotyped problems. Professional mathematicians think a certain way to solve real problems, problems that can arise from the everyday world, or from science, or from within mathematics itself. The key to success in school math is to learn to think inside-the-box. In contrast, a key feature of mathematical thinking is thinking outside-the-box – a valuable ability in today’s world. This course helps to develop that crucial way of thinking.",
                        Link = "https://www.coursera.org/learn/mathematical-thinking",
                        School = "Coursera"
                    },

                    new() {
                        Title = "Babylonian mathematics",
                        Category = "Mathematics",
                        Description = "This free course looks at Babylonian mathematics. You will learn how a series of discoveries has enabled historians to decipher stone tablets and study the various techniques the Babylonians used for problem-solving and teaching. The Babylonian problem-solving skills have been described as remarkable and scribes of the time received a training far in advance of anything available in medieval Christian Europe 3000 years later.",
                        Link = "https://www.open.edu/openlearn/science-maths-technology/mathematics-statistics/babylonian-mathematics/content-section-0?active-tab=description-tab",
                        School = "The Open University"
                    },

                    new() {
                        Title = "Algebraic Methods, Graphs and Applied Mathematics Methods",
                        Category = "Mathematics",
                        Description = "This course by Imperial College London is designed to help you develop the skills you need to succeed in your A-level maths exams. You will investigate key topic areas to gain a deeper understanding of the skills and techniques that you can apply throughout your A-level study. ",
                        Link = "https://www.edx.org/learn/math/imperial-college-london-a-level-mathematics-for-year-12-course-1-algebraic-methods-graphs-and-applied-mathematics-methods?index=product&objectID=course-37a24f56-f624-41f2-859f-fda43f451e54&webview=false&campaign=A-level+Mathematics+for+Year+12+-+Course+1%3A+Algebraic+Methods%2C+Graphs+and+Applied+Mathematics+Methods&source=edX&product_category=course&placement_url=https%3A%2F%2Fwww.edx.org%2Flearn%2Fgeometry",
                        School = "EDX"
                    },

                    new() {
                        Title = "MA005: Calculus I",
                        Category = "Mathematics",
                        Description = "This course is divided into five learning sections, or units, plus a reference section, or appendix. The course begins with a unit that provides a review of algebra specifically designed to help and prepare you for the study of calculus. The second unit discusses functions, graphs, limits, and continuity. Understanding limits could not be more important, as that topic really begins the study of calculus. The third unit introduces and explains derivatives. With derivatives, we are now ready to handle all of those things that change mentioned above. The fourth unit makes visual sense of derivatives by discussing derivatives and graphs. The fifth unit introduces and explains antiderivatives and definite integrals. Finally, the reference section provides a large collection of reference facts, geometry, and trigonometry that will assist you in solving calculus problems long after the course is over.",
                        Link = "https://learn.saylor.org/course/view.php?id=25",
                        School = "Saylor"
                    },

                    new() {
                        Title = "Early Childhood: Development of Math Skills",
                        Category = "Mathematics",
                        Description = "Skills developed in preschool help children to grasp new subject matters they encounter later. This teaching course provides a foundation on which to build math skills in early childhood education. It draws on the existing research to explain the importance, techniques and tools of mathematics education. Whether you are a teacher, school counselor or parent homeschooling your kids, sign up to learn a critical aspect of childhood education.",
                        Link = "https://alison.com/course/early-childhood-development-of-math-skills",
                        School = "Alison"
                    },

                    new() {
                        Title = "Introduction to Python",
                        Category = "Computer Science",
                        Description = "\"Introduction to Python\" is a beginner-friendly course that teaches the fundamentals of programming using the Python language. Students will learn core concepts such as variables, data types, control structures, functions, and basic data structures, enabling them to write simple yet powerful programs and scripts.",
                        Link = "https://www.coursera.org/projects/introduction-to-python",
                        School = "Coursera"
                    },

                    new() {
                        Title = "Develop Your First Python Program",
                        Category = "Computer Science",
                        Description = "\"Develop Your First Python Program\" is a practical course designed to guide beginners through the process of creating their first Python application. Participants will learn essential programming skills, including writing and debugging code, using libraries, and implementing basic algorithms, culminating in the development of a functional Python program.",
                        Link = "https://www.coursera.org/projects/python101-develop-your-first-python-code",
                        School = "Coursera"
                    },

                    new() {
                        Title = "Python for Data Science, AI & Development",
                        Category = "Computer Science",
                        Description = "\"Python for Data Science, AI & Development\" is an advanced course that equips learners with the Python programming skills needed for data analysis, machine learning, and AI applications. Students will explore data manipulation, visualization, statistical modeling, and algorithm development, preparing them to tackle real-world challenges in data science and artificial intelligence.",
                        Link = "https://www.coursera.org/learn/python-for-applied-data-science-ai",
                        School = "Coursera"
                    },

                    // https://www.coursera.org/learn/food-and-health
                    new() {
                        Title = "Stanford Introduction to Food and Health\n",
                        Category = "Health",
                        Description = "\"Stanford Introduction to Food and Health\" is a comprehensive course that explores the relationship between diet, nutrition, and health. Students will learn about the principles of healthy eating, the impact of food on chronic diseases, and strategies for making informed dietary choices to promote overall well-being.",
                        Link = "https://www.coursera.org/learn/food-and-health",
                        School = "Coursera"
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
