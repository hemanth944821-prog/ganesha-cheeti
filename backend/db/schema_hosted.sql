-- ============================================================
-- Ganesha Cheeti (ಗಣೇಶ ಚೀಟಿ) - MSSQL Cloud Database Script
-- Target Database: db68614
-- ============================================================

IF OBJECT_ID('dbo.Contributions', 'U') IS NOT NULL DROP TABLE dbo.Contributions;
IF OBJECT_ID('dbo.Payouts', 'U') IS NOT NULL DROP TABLE dbo.Payouts;
IF OBJECT_ID('dbo.Expenses', 'U') IS NOT NULL DROP TABLE dbo.Expenses;
IF OBJECT_ID('dbo.Loans', 'U') IS NOT NULL DROP TABLE dbo.Loans;
IF OBJECT_ID('dbo.CheetiCycles', 'U') IS NOT NULL DROP TABLE dbo.CheetiCycles;
IF OBJECT_ID('dbo.Members', 'U') IS NOT NULL DROP TABLE dbo.Members;

CREATE TABLE dbo.Members (
    MemberID INT IDENTITY(1,1) PRIMARY KEY,
    MemberCode NVARCHAR(20) NOT NULL UNIQUE,
    Name_EN NVARCHAR(100) NOT NULL,
    Name_KN NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(15) NOT NULL UNIQUE,
    Password NVARCHAR(255) NOT NULL DEFAULT '1234',
    Role NVARCHAR(20) NOT NULL DEFAULT 'Member',
    Status NVARCHAR(20) NOT NULL DEFAULT 'Active',
    JoinedDate DATE NOT NULL DEFAULT GETDATE(),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);

CREATE TABLE dbo.CheetiCycles (
    CycleID INT IDENTITY(1,1) PRIMARY KEY,
    CycleName NVARCHAR(100) NOT NULL,
    StartMonthYear NVARCHAR(20) NOT NULL,
    EndMonthYear NVARCHAR(20) NOT NULL,
    DefaultMonthlyAmount DECIMAL(18,2) NOT NULL DEFAULT 200.00,
    TotalMembers INT NOT NULL DEFAULT 15,
    DrawDayOfMonth INT NOT NULL DEFAULT 12,
    Status NVARCHAR(20) NOT NULL DEFAULT 'Active'
);

CREATE TABLE dbo.Contributions (
    ContributionID INT IDENTITY(1,1) PRIMARY KEY,
    MemberID INT NOT NULL FOREIGN KEY REFERENCES dbo.Members(MemberID),
    CycleID INT NULL FOREIGN KEY REFERENCES dbo.CheetiCycles(CycleID),
    MonthYear NVARCHAR(20) NOT NULL,
    DueDate DATE NOT NULL,
    Amount DECIMAL(18,2) NOT NULL DEFAULT 200.00,
    PaymentMethod NVARCHAR(30) NOT NULL DEFAULT 'UPI',
    Status NVARCHAR(20) NOT NULL DEFAULT 'Paid',
    PaidDate DATETIME NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);

CREATE TABLE dbo.Payouts (
    PayoutID INT IDENTITY(1,1) PRIMARY KEY,
    MemberID INT NOT NULL FOREIGN KEY REFERENCES dbo.Members(MemberID),
    CycleID INT NULL FOREIGN KEY REFERENCES dbo.CheetiCycles(CycleID),
    MonthYear NVARCHAR(20) NOT NULL,
    DrawDate DATE NOT NULL,
    AmountWon DECIMAL(18,2) NOT NULL,
    PaymentMethod NVARCHAR(30) NOT NULL DEFAULT 'UPI',
    Status NVARCHAR(20) NOT NULL DEFAULT 'Completed',
    Notes NVARCHAR(255) NULL
);

CREATE TABLE dbo.Expenses (
    ExpenseID INT IDENTITY(1,1) PRIMARY KEY,
    Title_EN NVARCHAR(150) NOT NULL,
    Title_KN NVARCHAR(150) NOT NULL,
    Category NVARCHAR(50) NOT NULL DEFAULT 'Festival',
    Amount DECIMAL(18,2) NOT NULL,
    ExpenseDate DATE NOT NULL,
    Notes NVARCHAR(255) NULL,
    CreatedBy INT NULL FOREIGN KEY REFERENCES dbo.Members(MemberID)
);

CREATE TABLE dbo.Loans (
    LoanID INT IDENTITY(1,1) PRIMARY KEY,
    BorrowerID INT NOT NULL FOREIGN KEY REFERENCES dbo.Members(MemberID),
    PrincipalAmount DECIMAL(18,2) NOT NULL,
    MonthlyInterestRatePercent DECIMAL(5,2) NOT NULL DEFAULT 5.00,
    DisbursedDate DATE NOT NULL,
    DueDate DATE NULL,
    TotalInterestCollected DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    Status NVARCHAR(20) NOT NULL DEFAULT 'Active'
);

-- SEED DATA WITH ADMIN AS MEMBER #01 & PASSWORDS
INSERT INTO dbo.Members (MemberCode, Name_EN, Name_KN, Phone, Password, Role, Status) VALUES
('M#01', 'Ganesh (Admin)', N'ಗಣೇಶ್ (ಅಡ್ಮಿನ್)', '9876543210', 'admin123', 'Admin', 'Active'),
('M#02', 'Ramesh', N'ರಮೇಶ್', '9876543211', '1234', 'Member', 'Active'),
('M#03', 'Suresh', N'ಸುರೇಶ್', '9876543212', '1234', 'Member', 'Active'),
('M#04', 'Mahesh', N'ಮಹೇಶ್', '9876543213', '1234', 'Member', 'Active'),
('M#05', 'Ravi', N'ರವಿ', '9876543214', '1234', 'Member', 'Active'),
('M#06', 'Shankar', N'ಶಂಕರ್', '9876543215', '1234', 'Member', 'Active'),
('M#07', 'Ramesh Kumar', N'ರಮೇಶ್ ಕುಮಾರ್', '9876543216', '1234', 'Member', 'Active'),
('M#08', 'Lakshmi', N'ಲಕ್ಷ್ಮಿ', '9876543217', '1234', 'Member', 'Active'),
('M#09', 'Anitha', N'ಅನಿತಾ', '9876543218', '1234', 'Member', 'Active'),
('M#10', 'Kumar', N'ಕುಮಾರ್', '9876543219', '1234', 'Member', 'Active'),
('M#11', 'Pooja', N'ಪೂಜಾ', '9876543220', '1234', 'Member', 'Active'),
('M#12', 'Manjunath', N'ಮಂಜುನಾಥ್', '9876543221', '1234', 'Member', 'Active'),
('M#13', 'Shivaram', N'ಶಿವರಾಮ್', '9876543222', '1234', 'Member', 'Active'),
('M#14', 'Basavaraj', N'ಬಸವರಾಜ್', '9876543223', '1234', 'Member', 'Active'),
('M#15', 'Venkatesh', N'ವೆಂಕಟೇಶ್', '9876543224', '1234', 'Member', 'Active');

INSERT INTO dbo.CheetiCycles (CycleName, StartMonthYear, EndMonthYear, DefaultMonthlyAmount, TotalMembers, DrawDayOfMonth)
VALUES (N'Sri Ganesh Friends 12-Month Cycle', 'Oct 2025', 'Sep 2026', 200.00, 15, 12);

INSERT INTO dbo.Expenses (Title_EN, Title_KN, Category, Amount, ExpenseDate, Notes) VALUES
('Ganesh Chaturthi Puja (Temple & Prasad)', N'ಗಣೇಶ ಚತುರ್ಥಿ ಪೂಜೆ (ದೇವಾಲಯ ಮತ್ತು ಪ್ರಸಾದ)', 'Festival', 2500.00, '2026-09-12', 'Puja materials and prasad'),
('Group Dinner', N'ಗುಂಪು ಊಟ', 'Other', 1800.00, '2026-08-05', 'Annual members dinner'),
('Temple Donation', N'ದೇವಾಲಯ ದೇಣಿಗೆ', 'Temple', 1000.00, '2026-01-15', 'Local temple renovation'),
('Flowers & Decoration', N'ಹೂವುಗಳು ಮತ್ತು ಅಲಂಕಾರ', 'Festival', 950.00, '2025-08-27', 'Festival stage decoration'),
('Miscellaneous', N'ಇತರ ಖರ್ಚುಗಳು', 'Other', 1200.00, '2025-05-10', 'Stationery & ledger book');

INSERT INTO dbo.Payouts (MemberID, MonthYear, DrawDate, AmountWon, PaymentMethod) VALUES
(3, 'Jun 2026', '2026-06-12', 2400.00, 'UPI'),
(8, 'Jul 2026', '2026-07-12', 2400.00, 'Bank Transfer'),
(5, 'Aug 2026', '2026-08-12', 2400.00, 'UPI'),
(7, 'Sep 2026', '2026-09-12', 2400.00, 'UPI');
