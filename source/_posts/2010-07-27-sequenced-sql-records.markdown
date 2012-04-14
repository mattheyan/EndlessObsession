---
date: '2010-07-27 18:17:20'
layout: post
slug: sequenced-sql-records
status: publish
title: Sequenced SQL Records
wordpress_id: '83'
categories:
- database
tags:
- sql
- sql server
---

### How to sequence values in a table.  The non-so-elegant solution...


Imagine you have a table that contains records with a foreign key (string, int, guid, etc...) and an index or sequence number, 1-3, so that there are three records for each foreign key value.  In another table you have any number of records that contain the same foreign key, as well as a value field (date, number, string, etc...) that can be sequenced in some logical fashion corresponding to the sequence 1-3 in the key table.  You mission (should you choose to accept it) is to get the values from the value table and join them to the corresponding sequence records in the key table.

What follows is the answer I arrived at late this afternoon.  Please let me know if you have a better way.







	
  * declare @dates table(num varchar(9), date datetime)

	
  * 
	
  * insert into @dates

	
  * select '192837465', cast('1/3/2008' as datetime) union

	
  * select '192837465', cast('3/12/2003' as datetime) union

	
  * select '192837465', cast('5/22/2010' as datetime) union

	
  * select '192837465', cast('2/1/2004' as datetime)

	
  * 
	
  * declare @keys table(num varchar(9), sequence int)

	
  * 
	
  * insert into @keys

	
  * select '192837465', 1 union

	
  * select '192837465', 2 union

	
  * select '192837465', 3

	
  * 
	
  * select

	
  * k.num,

	
  * k.sequence,

	
  * date = (select MIN(t.date) from (select top 1 date from @dates where num = k.num order by date desc) t)

	
  * from @keys k

	
  * where sequence = 1

	
  * union

	
  * select

	
  * k.num,

	
  * k.sequence,

	
  * date = (select MIN(t.date) from (select top 2 date from @dates where num = k.num order by date desc) t)

	
  * from @keys k

	
  * where sequence = 2

	
  * union

	
  * select

	
  * k.num,

	
  * k.sequence,

	
  * date = (select MIN(t.date) from (select top 3 date from @dates where num = k.num order by date desc) t)

	
  * from @keys k

	
  * where sequence = 3






I union the key table 3 times, filtering by each sequence number.  In each sub-query, the value is obtained by selecting the top N values, filtered by the foreign key and ordered by their value (descending), and then getting the min value.

Kind of an odd-ball case, but I might find this humorous one day.  And Pete will laugh, because I laughed at my code.
