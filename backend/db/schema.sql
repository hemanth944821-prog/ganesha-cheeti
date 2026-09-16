-- ============================================================
-- Ganesha Cheeti (ಗಣೇಶ ಚೀಟಿ) - MSSQL Database Initialization Script
-- Target Database: Microsoft SQL Server 2016+ / Azure SQL
-- ============================================================

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = N'GaneshaCheetiDB')
BEGIN
    CREATE DATABASE GaneshaCheetiDB;
END
GO

USE GaneshaCheetiDB;
GO

-- 1. Members Table (ಸದಸ್ಯರು)
IF OBJECT_ID('dbo.Members', 'U') IS NOT NULL DROP TABLE dbo.Members;
CREATE TABLE dbo.Members (
    MemberID INT IDENTITY(1,1) PRIMARY KEY,
    MemberCode NVARCHAR(20) NOT NULL UNIQUE, -- e.g. M#01, M#02
    Name_EN NVARCHAR(100) NOT NULL,
    Name_KN NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(15) NULL,
    UPI_ID NVARCHAR(50) NULL,
    Role NVARCHAR(20) NOT NULL DEFAULT 'Member', -- 'Admin' or 'Member'
    Status NVARCHAR(20) NOT NULL DEFAULT 'Active', -- 'Active', 'Inactive'
    JoinedDate DATE NOT NULL DEFAULT GETDATE(),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);

-- 2. Cheeti Cycles Table (ಚೀಟಿ ಚಕ್ರಗಳು)
IF OBJECT_ID('dbo.CheetiCycles', 'U') IS NOT NULL DROP TABLE dbo.CheetiCycles;
CREATE TABLE dbo.CheetiCycles (
    CycleID INT IDENTITY(1,1) PRIMARY KEY,
    CycleName NVARCHAR(100) NOT NULL, -- e.g. "Year 3 Cycle"
    StartMonthYear NVARCHAR(20) NOT NULL,
    EndMonthYear NVARCHAR(20) NOT NULL,
    DefaultMonthlyAmount DECIMAL(18,2) NOT NULL DEFAULT 200.00,
    TotalMembers INT NOT NULL DEFAULT 15,
    DrawDayOfMonth INT NOT NULL DEFAULT 12, -- 12th of every month
    Status NVARCHAR(20) NOT NULL DEFAULT 'Active'
);

-- 3. Monthly Contributions Table (ತಿಂಗಳ ಕೊಡುಗೆ)
IF OBJECT_ID('dbo.Contributions', 'U') IS NOT NULL DROP TABLE dbo.Contributions;
CREATE TABLE dbo.Contributions (
    ContributionID INT IDENTITY(1,1) PRIMARY KEY,
    MemberID INT NOT NULL FOREIGN KEY REFERENCES dbo.Members(MemberID),
    CycleID INT NULL FOREIGN KEY REFERENCES dbo.CheetiCycles(CycleID),
    MonthYear NVARCHAR(20) NOT NULL, -- e.g. "Sep 2026", "Oct 2026"
    DueDate DATE NOT NULL,
    Amount DECIMAL(18,2) NOT NULL DEFAULT 200.00,
    PaymentMethod NVARCHAR(30) NOT NULL DEFAULT 'UPI', -- 'Cash', 'UPI', 'Bank Transfer'
    TransactionRef NVARCHAR(100) NULL,
    Status NVARCHAR(20) NOT NULL DEFAULT 'Paid', -- 'Paid', 'Pending', 'Overdue'
    PaidDate DATETIME NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);

-- 4. Payouts / Winners Table (ಚೀಟಿ ಗೆದ್ದವರು / ಪಾವತಿ)
IF OBJECT_ID('dbo.Payouts', 'U') IS NOT NULL DROP TABLE dbo.Payouts;
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

-- 5. Expenses Table (ಖರ್ಚುಗಳು)
IF OBJECT_ID('dbo.Expenses', 'U') IS NOT NULL DROP TABLE dbo.Expenses;
CREATE TABLE dbo.Expenses (
    ExpenseID INT IDENTITY(1,1) PRIMARY KEY,
    Title_EN NVARCHAR(150) NOT NULL,
    Title_KN NVARCHAR(150) NOT NULL,
    Category NVARCHAR(50) NOT NULL DEFAULT 'Festival', -- 'Festival', 'Temple', 'Other'
    Amount DECIMAL(18,2) NOT NULL,
    ExpenseDate DATE NOT NULL,
    Notes NVARCHAR(255) NULL,
    CreatedBy INT NULL FOREIGN KEY REFERENCES dbo.Members(MemberID)
);

-- 6. Loans & Interest Table (ಸಾಲ ಮತ್ತು ಬಡ್ಡಿ)
IF OBJECT_ID('dbo.Loans', 'U') IS NOT NULL DROP TABLE dbo.Loans;
CREATE TABLE dbo.Loans (
    LoanID INT IDENTITY(1,1) PRIMARY KEY,
    BorrowerID INT NOT NULL FOREIGN KEY REFERENCES dbo.Members(MemberID),
    PrincipalAmount DECIMAL(18,2) NOT NULL,
    MonthlyInterestRatePercent DECIMAL(5,2) NOT NULL DEFAULT 5.00, -- e.g. 5% approx
    DisbursedDate DATE NOT NULL,
    DueDate DATE NULL,
    TotalInterestCollected DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    Status NVARCHAR(20) NOT NULL DEFAULT 'Active' -- 'Active', 'Closed'
);

-- ============================================================
-- SEED DATA SETUP (2 Years Completed, ₹90,000 Savings)
-- ============================================================

-- Members
INSERT INTO dbo.Members (MemberCode, Name_EN, Name_KN, Phone, UPI_ID, Role, Status) VALUES
('M#01', 'Ganesh', 'ಗಣೇಶ್', '9876543210', 'ganesh@upi', 'Admin', 'Active'),
('M#02', 'Ramesh', 'ರಮೇಶ್', '9876543211', 'ramesh@upi', 'Member', 'Active'),
('M#03', 'Suresh', 'ಸುರೇಶ್', '9876543212', 'suresh@upi', 'Member', 'Active'),
('M#04', 'Mahesh', 'ಮಹೇಶ್', '9876543213', 'mahesh@upi', 'Member', 'Active'),
('M#05', 'Ravi', 'ರವಿ', '9876543214', 'ravi@upi', 'Member', 'Active'),
('M#06', 'Shankar', 'ಶಂಕರ್', '9876543215', 'shankar@upi', 'Member', 'Active'),
('M#07', 'Ramesh Kumar', 'ರಮೇಶ್ ಕುಮಾರ್', '9876543216', 'hemantha@ybl', 'Member', 'Active'),
('M#08', 'Lakshmi', 'ಲಕ್ಷ್ಮಿ', '9876543217', 'lakshmi@upi', 'Member', 'Active'),
('M#09', 'Anitha', 'ಅನಿತಾ', '9876543218', 'anitha@upi', 'Member', 'Active'),
('M#10', 'Kumar', 'ಕುಮಾರ್', '9876543219', 'kumar@upi', 'Member', 'Active'),
('M#11', 'Pooja', 'ಪೂಜಾ', '9876543220', 'pooja@upi', 'Member', 'Active'),
('M#12', 'Manjunath', 'ಮಂಜುನಾಥ್', '9876543221', 'manju@upi', 'Member', 'Active'),
('M#13', 'Shivaram', 'ಶಿವರಾಮ್', '9876543222', 'shiva@upi', 'Member', 'Active'),
('M#14', 'Basavaraj', 'ಬಸವರಾಜ್', '9876543223', 'basava@upi', 'Member', 'Active'),
('M#15', 'Venkatesh', 'ವೆಂಕಟೇಶ್', '9876543224', 'venki@upi', 'Member', 'Active');

-- Cheeti Cycle
INSERT INTO dbo.CheetiCycles (CycleName, StartMonthYear, EndMonthYear, DefaultMonthlyAmount, TotalMembers, DrawDayOfMonth)
VALUES ('Sri Ganesh Friends 12-Month Cycle', 'Oct 2025', 'Sep 2026', 200.00, 15, 12);

-- Expenses
INSERT INTO dbo.Expenses (Title_EN, Title_KN, Category, Amount, ExpenseDate, Notes) VALUES
('Ganesh Chaturthi Puja (Temple & Prasad)', 'ಗಣೇಶ ಚತುರ್ಥಿ ಪೂಜೆ (ದೇವಾಲಯ ಮತ್ತು ಪ್ರಸಾದ)', 'Festival', 2500.00, '2026-09-12', 'Puja materials and prasad'),
('Group Dinner', 'ಗುಂಪು ಊಟ', 'Other', 1800.00, '2026-08-05', 'Annual members dinner'),
('Temple Donation', 'ದೇವಾಲಯ ದೇಣಿಗೆ', 'Temple', 1000.00, '2026-01-15', 'Local temple renovation'),
('Flowers & Decoration', 'ಹೂವುಗಳು ಮತ್ತು ಅಲಂಕಾರ', 'Festival', 950.00, '2025-08-27', 'Festival stage decoration'),
('Miscellaneous', 'ಇತರ ಖರ್ಚುಗಳು', 'Other', 1200.00, '2025-05-10', 'Stationery & ledger book');

-- Payouts / Winners
INSERT INTO dbo.Payouts (MemberID, MonthYear, DrawDate, AmountWon, PaymentMethod) VALUES
(3, 'Jun 2026', '2026-06-12', 2400.00, 'UPI'),
(8, 'Jul 2026', '2026-07-12', 2400.00, 'Bank Transfer'),
(5, 'Aug 2026', '2026-08-12', 2400.00, 'UPI'),
(7, 'Sep 2026', '2026-09-12', 2400.00, 'UPI');

GO
